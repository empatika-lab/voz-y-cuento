'use client';

import { useCallback, useEffect, useRef } from 'react';

interface YouTubeEmbedProps {
	youtubeUrl: string;
	width?: string;
	height?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	markCourseLessonAsViewed: (lessonId: string) => void;
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

export default function YoutubeEmbed({
	youtubeUrl,
	lessonId,
	markCourseLessonAsViewed,
}: YouTubeEmbedProps) {
	const playerRef = useRef<YTPlayer | null>(null);

	const videoId = youtubeUrl.split('v=')[1];

	const onPlayerStateChange = useCallback((event: { data: number }) => {
		if (event.data === window.YT.PlayerState.ENDED) {
			markCourseLessonAsViewed(lessonId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

		function initializePlayer() {
			if (!playerRef.current) {
				playerRef.current = new window.YT.Player('youtube-player', {
					videoId,
					width: '100%',
					height: '100%',
					events: {
						onStateChange: onPlayerStateChange,
					},
				});
			}
		}

		return () => {
			if (tag) {
				document.body.removeChild(tag);
			}
		};
	}, [onPlayerStateChange, videoId]);

	return (
		<div className="w-full bg-cyan-50 pb-3">
			<div id="youtube-player" className="aspect-video w-full" />
		</div>
	);
}
