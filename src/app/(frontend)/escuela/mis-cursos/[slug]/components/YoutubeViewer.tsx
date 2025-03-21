'use client';

import { useCallback, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';

const ClientOnly = dynamic(() => import('@/components/ClientOnly'), { ssr: false });

interface YouTubeEmbedProps {
	youtubeUrl: string;
	width?: string;
	height?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	markCourseLessonAsViewed: (lessonId: string) => Promise<any>;
	lessonId: string;
}

// Add YouTube Player type definitions
interface YTPlayer {
	getCurrentTime: () => number;
	playVideo: () => void;
	pauseVideo: () => void;
	getPlayerState: () => number;
	// Add other methods as needed
}

interface YTPlayerState {
	PLAYING: number;
	PAUSED: number;
	ENDED: number;
}

// Define YT Player event types
interface YTPlayerEvent {
	data: number;
	target: YTPlayer;
}

declare global {
	interface Window {
		onYouTubeIframeAPIReady: () => void;
		YT: {
			Player: new (
				elementId: string,
				config: {
					videoId: string;
					width?: string;
					height?: string;
					events?: {
						onStateChange?: (event: YTPlayerEvent) => void;
						onReady?: (event: YTPlayerEvent) => void;
					};
					playerVars?: {
						rel?: number;
						modestbranding?: number;
						showinfo?: number;
						origin?: string;
						iv_load_policy?: number;
						controls?: number;
						disablekb?: number;
						fs?: number;
						playsinline?: number;
						enablejsapi?: number;
					};
				},
			) => YTPlayer;
			PlayerState: YTPlayerState;
		};
	}
}

function YouTubePlayerInstance({
	youtubeUrl,
	lessonId,
	markCourseLessonAsViewed,
	playerId,
}: YouTubeEmbedProps & { playerId: string }) {
	const playerRef = useRef<YTPlayer | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const isFullscreenRef = useRef<boolean>(false);
	const originalStylesRef = useRef<{
		width?: string;
		height?: string;
		position?: string;
		top?: string;
		left?: string;
		zIndex?: string;
	}>({});
	const clickTimeRef = useRef<number>(0);
	const videoId = useMemo(() => {
		const url = new URL(youtubeUrl);
		const urlParams = new URLSearchParams(url.search);
		return urlParams.get('v') ?? '';
	}, [youtubeUrl]);

	const onPlayerStateChange = useCallback(
		async (event: YTPlayerEvent) => {
			if (event.data === window.YT.PlayerState.ENDED) {
				await markCourseLessonAsViewed(lessonId);

				// Show end overlay when video ends
				const endOverlay = document.getElementById(`end-overlay-${playerId}`);
				if (endOverlay) {
					endOverlay.style.display = 'flex';
				}
			} else if (event.data === window.YT.PlayerState.PLAYING) {
				// Hide end overlay when video plays
				const endOverlay = document.getElementById(`end-overlay-${playerId}`);
				if (endOverlay) {
					endOverlay.style.display = 'none';
				}
			}
		},
		[lessonId, markCourseLessonAsViewed, playerId],
	);

	const initializePlayer = useCallback(() => {
		if (!playerRef.current && window.YT && containerRef.current) {
			// Clear any existing content
			containerRef.current.innerHTML = `<div id="${playerId}"></div>`;

			playerRef.current = new window.YT.Player(playerId, {
				videoId,
				width: '100%',
				height: '100%',
				events: {
					onStateChange: onPlayerStateChange,
					onReady: (_event: YTPlayerEvent) => {
						// Apply CSS to hide YouTube logo when player is ready
						const iframe = containerRef.current?.querySelector('iframe');
						if (iframe) {
							// Set Content Security Policy to prevent navigation
							iframe.setAttribute(
								'sandbox',
								'allow-scripts allow-same-origin allow-presentation allow-popups',
							);

							// Try an alternative approach - set up a MutationObserver to catch and remove these elements
							try {
								const iframeWindow = iframe.contentWindow;
								const iframeDoc = iframe.contentDocument;

								if (iframeWindow && iframeDoc) {
									const observer = new MutationObserver((_mutations) => {
										// Find and remove any impression links
										const impressionLinks = iframeDoc.querySelectorAll('.ytp-impression-link');
										if (impressionLinks?.length) {
											impressionLinks.forEach((link: Element) => {
												link.remove();
											});
										}

										// Find and disable any links with target="_blank"
										const blankLinks = iframeDoc.querySelectorAll('a[target="_blank"]');
										if (blankLinks?.length) {
											blankLinks.forEach((link: Element) => {
												// Type assertion to HTMLElement which has style property
												const htmlLink = link as HTMLElement;
												htmlLink.style.display = 'none';
												htmlLink.style.pointerEvents = 'none';
											});
										}

										// Find and remove endscreen elements
										[
											'ytp-ce-element',
											'ytp-endscreen-content',
											'html5-endscreen',
											'iv-branding',
										].forEach((className) => {
											const elements = iframeDoc.querySelectorAll(`.${className}`);
											if (elements?.length) {
												elements.forEach((el: Element) => {
													el.remove();
												});
											}
										});
									});

									// Start observing
									observer.observe(iframeDoc, {
										childList: true,
										subtree: true,
										attributes: true,
										attributeFilter: ['class', 'style'],
									});

									// Store observer reference on container for cleanup
									if (containerRef.current) {
										// Type assertion to add custom property
										(
											containerRef.current as HTMLDivElement & { _observer?: MutationObserver }
										)._observer = observer;
									}
								}
							} catch {
								// CORS might prevent this from working
							}

							// Create overlay to catch all clicks in the logo area
							const logoOverlay = document.createElement('div');
							logoOverlay.style.position = 'absolute';
							logoOverlay.style.top = '0';
							logoOverlay.style.left = '0';
							logoOverlay.style.width = '100%';
							logoOverlay.style.height = '50px';
							logoOverlay.style.zIndex = '10';
							logoOverlay.style.cursor = 'default';
							logoOverlay.addEventListener('click', (e) => {
								e.preventDefault();
								e.stopPropagation();
							});

							// Add a full-screen overlay that appears at the end of the video
							const endOverlay = document.createElement('div');
							endOverlay.id = `end-overlay-${playerId}`;
							endOverlay.style.position = 'absolute';
							endOverlay.style.top = '0';
							endOverlay.style.left = '0';
							endOverlay.style.width = '100%';
							endOverlay.style.height = '100%';
							endOverlay.style.display = 'none';
							endOverlay.style.zIndex = '20';
							endOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
							endOverlay.style.cursor = 'pointer';
							endOverlay.style.alignItems = 'center';
							endOverlay.style.justifyContent = 'center';

							// Add replay button inside end overlay
							const replayButton = document.createElement('div');
							replayButton.innerHTML = '↻ Replay';
							replayButton.style.color = 'white';
							replayButton.style.fontSize = '24px';
							replayButton.style.padding = '15px 30px';
							replayButton.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
							replayButton.style.borderRadius = '5px';
							endOverlay.appendChild(replayButton);

							// Prevent clicks on the endscreen overlay from opening YouTube
							endOverlay.addEventListener('click', (e) => {
								e.preventDefault();
								e.stopPropagation();
								// Replay the video when clicked
								if (playerRef.current) {
									playerRef.current.playVideo();
									endOverlay.style.display = 'none';
								}
							});

							// Create an interactive overlay for play/pause and fullscreen toggle
							const interactiveOverlay = document.createElement('div');
							interactiveOverlay.style.position = 'absolute';
							interactiveOverlay.style.top = '0';
							interactiveOverlay.style.left = '0';
							interactiveOverlay.style.width = '100%';
							interactiveOverlay.style.height = '100%';
							interactiveOverlay.style.zIndex = '5';
							interactiveOverlay.style.cursor = 'pointer';
							interactiveOverlay.style.background = 'transparent';

							// Add click handling for play/pause and double-click for fullscreen toggle
							interactiveOverlay.addEventListener('click', (e) => {
								e.preventDefault();
								e.stopPropagation();

								const now = new Date().getTime();

								if (now - clickTimeRef.current < 300) {
									// Double click - toggle fullscreen
									if (isFullscreenRef.current) {
										// Exit fullscreen - restore original styles
										if (containerRef.current) {
											// Restore all original styles
											const styles = originalStylesRef.current;
											containerRef.current.style.position = styles.position ?? 'relative';
											containerRef.current.style.width = styles.width ?? '100%';
											containerRef.current.style.height = styles.height ?? 'auto';
											containerRef.current.style.top = styles.top ?? '';
											containerRef.current.style.left = styles.left ?? '';
											containerRef.current.style.zIndex = styles.zIndex ?? '';
										}
										isFullscreenRef.current = false;
									} else {
										// Enter fullscreen
										if (containerRef.current) {
											// Store original styles for restoration
											originalStylesRef.current = {
												width: containerRef.current.style.width,
												height: containerRef.current.style.height,
												position: containerRef.current.style.position,
												top: containerRef.current.style.top,
												left: containerRef.current.style.left,
												zIndex: containerRef.current.style.zIndex,
											};

											// Apply fullscreen styles
											containerRef.current.style.position = 'fixed';
											containerRef.current.style.top = '0';
											containerRef.current.style.left = '0';
											containerRef.current.style.width = '100vw';
											containerRef.current.style.height = '100vh';
											containerRef.current.style.zIndex = '9999';

											// Ensure any iframe inside also fills the container
											const iframe = containerRef.current.querySelector('iframe');
											if (iframe) {
												iframe.style.width = '100%';
												iframe.style.height = '100%';
											}
										}
										isFullscreenRef.current = true;
									}
								} else {
									// Single click - play/pause
									if (playerRef.current) {
										if (playerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING) {
											playerRef.current.pauseVideo();
										} else {
											playerRef.current.playVideo();
										}
									}
								}

								clickTimeRef.current = now;
							});

							containerRef.current!.style.position = 'relative';
							containerRef.current!.appendChild(logoOverlay);
							containerRef.current!.appendChild(endOverlay);
							containerRef.current!.appendChild(interactiveOverlay);

							// Set up a more aggressive periodic check to remove YouTube impression links
							const removeImpressionLinks = () => {
								try {
									if (iframe.contentDocument) {
										const links = iframe.contentDocument.querySelectorAll('.ytp-impression-link');
										links.forEach((link: Element) => link.remove());
									}
								} catch {
									// Ignore CORS errors
								}
							};

							// Initial removal
							removeImpressionLinks();

							// Set up interval for repeated removal
							const linkRemovalInterval = setInterval(removeImpressionLinks, 1000);

							// Store interval ID for cleanup
							intervalRef.current = linkRemovalInterval;
						}
					},
				},
				playerVars: {
					rel: 0, // Don't show related videos
					modestbranding: 1, // Hide YouTube logo (as much as possible)
					showinfo: 0, // Hide video title (for older YouTube embeds)
					origin: window.location.origin,
					iv_load_policy: 3, // Hide video annotations
					controls: 1, // Show video controls
					disablekb: 0, // Enable keyboard controls
					fs: 0, // Disable fullscreen button
					playsinline: 1, // Play inline on iOS
					enablejsapi: 1, // Enable JS API
				},
			});
		}
	}, [onPlayerStateChange, videoId, playerId]);

	useEffect(() => {
		// Clean up previous player instance
		if (playerRef.current) {
			playerRef.current = null;
		}

		// Load YouTube API if not already loaded
		if (!window.YT) {
			const tag = document.createElement('script');
			tag.src = 'https://www.youtube.com/iframe_api';
			document.body.appendChild(tag);

			window.onYouTubeIframeAPIReady = initializePlayer;
		} else {
			initializePlayer();
		}

		// Cleanup on unmount
		return () => {
			if (playerRef.current) {
				playerRef.current = null;
			}
			if (containerRef.current) {
				// Clean up the observer if it exists
				const container = containerRef.current as HTMLDivElement & { _observer?: MutationObserver };
				if (container._observer) {
					container._observer.disconnect();
				}
				containerRef.current.innerHTML = '';
			}
			// Clear interval on component unmount
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [youtubeUrl, initializePlayer]);

	return (
		<div ref={containerRef} className="aspect-video w-full">
			<div id={playerId} className="aspect-video w-full" />
		</div>
	);
}

export default function YoutubeViewer(props: YouTubeEmbedProps) {
	const mobilePlayerId = useMemo(() => `youtube-player-mobile-${props.lessonId}`, [props.lessonId]);
	const desktopPlayerId = useMemo(
		() => `youtube-player-desktop-${props.lessonId}-${Math.random() * 1000000}`,
		[props.lessonId],
	);

	return (
		<>
			{/* Mobile View */}
			<div className="w-full bg-cyan-50 pb-3 lg:hidden">
				<ClientOnly>
					<YouTubePlayerInstance {...props} playerId={mobilePlayerId} />
				</ClientOnly>
			</div>

			{/* Desktop View */}
			<div className="hidden w-full bg-cyan-50 pb-3 lg:block">
				<ClientOnly>
					<YouTubePlayerInstance {...props} playerId={desktopPlayerId} />
				</ClientOnly>
			</div>
		</>
	);
}
