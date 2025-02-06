'use client';

import { useCallback, useEffect, useRef, useMemo } from 'react';

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
	// Add other methods as needed
}

interface YTPlayerState {
	PLAYING: number;
	PAUSED: number;
	ENDED: number;
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
						onStateChange?: (event: { data: number }) => void;
					};
				},
			) => YTPlayer;
			PlayerState: YTPlayerState;
		};
	}
}

export default function YoutubeViewer({
	youtubeUrl,
	lessonId,
	markCourseLessonAsViewed,
}: YouTubeEmbedProps) {
	const playerRef = useRef<YTPlayer | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const playerId = useMemo(() => `youtube-player-${lessonId}`, [lessonId]);
	const videoId = useMemo(() => youtubeUrl.split('v=')[1], [youtubeUrl]);

	const onPlayerStateChange = useCallback(
		async (event: { data: number }) => {
			if (event.data === window.YT.PlayerState.ENDED) {
				await markCourseLessonAsViewed(lessonId);
			}
		},
		[lessonId, markCourseLessonAsViewed],
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
				containerRef.current.innerHTML = '';
			}
		};
	}, [youtubeUrl, initializePlayer]);

	return (
		<>
			{/* Mobile View */}
			<div className="w-full bg-cyan-50 pb-3 lg:hidden">
				<div ref={containerRef} className="aspect-video w-full">
					<div id={playerId} className="aspect-video w-full" />
				</div>
			</div>

			{/* Desktop View */}
			<div className="hidden w-full bg-cyan-50 pb-3 lg:block">
				<div ref={containerRef} className="aspect-video w-full">
					<div id={playerId} className="aspect-video w-full" />
				</div>
			</div>
		</>
	);
}
