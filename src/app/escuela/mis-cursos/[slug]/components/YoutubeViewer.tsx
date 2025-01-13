'use client';

import { useCallback, useEffect, useRef } from 'react';

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
	/* Refs */
	const playerRef = useRef<YTPlayer | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const videoId = youtubeUrl.split('v=')[1];

	const onPlayerStateChange = useCallback(
		async (event: { data: number }) => {
			if (event.data === window.YT.PlayerState.ENDED) {
				await markCourseLessonAsViewed(lessonId);
			}
		},
		[lessonId, markCourseLessonAsViewed],
	);

	const initializePlayer = useCallback(() => {
		if (!playerRef.current && window.YT) {
			playerRef.current = new window.YT.Player('youtube-player', {
				videoId,
				width: '100%',
				height: '100%',
				events: {
					onStateChange: onPlayerStateChange,
				},
			});
		}
	}, [onPlayerStateChange, videoId]);

	// Reset player when URL changes
	useEffect(() => {
		if (playerRef.current) {
			// Destroy existing player
			playerRef.current = null;
			if (containerRef.current) {
				containerRef.current.innerHTML = '<div id="youtube-player"></div>';
			}
		}

		// Initialize new player
		if (window.YT) {
			initializePlayer();
		}
	}, [youtubeUrl, initializePlayer]);

	useEffect(() => {
		let tag: HTMLScriptElement | null = null;

		if (!window.YT) {
			tag = document.createElement('script');
			tag.src = 'https://www.youtube.com/iframe_api';
			document.body.appendChild(tag);
		} else {
			initializePlayer();
		}

		window.onYouTubeIframeAPIReady = initializePlayer;

		return () => {
			if (tag) {
				document.body.removeChild(tag);
			}
		};
	}, [initializePlayer]);

	return (
		<div className="w-full bg-cyan-50 pb-3">
			<div ref={containerRef} className="aspect-video w-full">
				<div id="youtube-player" className="aspect-video w-full" />
			</div>
		</div>
	);
}
