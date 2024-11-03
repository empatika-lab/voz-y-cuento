import React from 'react';

interface YouTubeEmbedProps {
	youtubeUrl: string;
	width?: string;
	height?: string;
}

export default function YouTubeEmbed({ youtubeUrl }: YouTubeEmbedProps) {
	const videoId = youtubeUrl.split('v=')[1];

	return (
		<div className="w-full bg-cyan-50 pb-3">
			<iframe
				className="aspect-video w-full"
				style={{ border: 0 }}
				src={`https://youtube.com/embed/${videoId}`}
				allowFullScreen
				title="Embedded YouTube Video"
			/>
		</div>
	);
}
