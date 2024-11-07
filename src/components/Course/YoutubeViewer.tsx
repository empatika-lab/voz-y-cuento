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
		// Load the YouTube API script
		const tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';
		document.body.appendChild(tag);

		// This function initializes the player once the API is ready
		window.onYouTubeIframeAPIReady = () => {
			playerRef.current = new window.YT.Player('youtube-player', {
				videoId,
				events: {
					onStateChange: onPlayerStateChange,
				},
			});
		};

		return () => {
			document.body.removeChild(tag); // Clean up script tag when component unmounts
		};
	}, [onPlayerStateChange, videoId]);

	return (
		<article className="w-full bg-cyan-50 pb-3">
			<div id="youtube-player" className="aspect-video w-full" />
		</article>
	);
}
