'use client';

import { useEffect, useRef, useState } from 'react';

interface YouTubeEmbedProps {
	youtubeUrl: string;
	width?: string;
	height?: string;
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

export default function YouTubeEmbed({ youtubeUrl }: YouTubeEmbedProps) {
	const playerRef = useRef<YTPlayer | null>(null);
	const [elapsedTime, setElapsedTime] = useState<number>(0);

	const videoId = youtubeUrl.split('v=')[1];

	const onPlayerStateChange = (event: { data: number }) => {
		switch (event.data) {
			case window.YT.PlayerState.PLAYING:
				// Video is playing
				trackElapsedTime();
				break;
			case window.YT.PlayerState.PAUSED:
				// Video is paused
				clearInterval(elapsedInterval);
				break;
			case window.YT.PlayerState.ENDED:
				// Video has finished
				clearInterval(elapsedInterval);
				// eslint-disable-next-line no-console
				console.log('Video finished');
				break;
			default:
				break;
		}
	};

	let elapsedInterval: NodeJS.Timeout;
	const trackElapsedTime = () => {
		elapsedInterval = setInterval(() => {
			if (playerRef.current) {
				const currentTime = playerRef.current.getCurrentTime();
				setElapsedTime(currentTime);
				// eslint-disable-next-line no-console
				console.log(`Elapsed time: ${elapsedTime}`);
			}
		}, 1000);
	};

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
			<div id="youtube-player" className="aspect-video w-full" /> {/* Ensure full width */}
		</div>
	);
}
