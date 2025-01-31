'use client';

import { useState } from 'react';
import NextImage from 'next/image';

/* Types */
import type { Event, Media } from '@/payload-types';

interface HireMeCardProps {
	event: Event;
}

export default function HireMeCard({ event }: HireMeCardProps) {
	const [imageLoading, setImageLoading] = useState(true);

	return (
		<li className="flip-card group h-[316px] w-[340px] rounded-[20px] [perspective:1000px] lg:mx-0">
			<div className="flip-card-inner relative h-[316px] w-[340px] rounded-[20px] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
				{/* Front */}
				<div className="flip-card-front absolute inset-0 h-full w-full rounded-[20px] [backface-visibility:hidden]">
					{imageLoading && (
						<div className="absolute inset-0 animate-shimmer rounded-[20px] bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-[length:400%_100%]" />
					)}
					<NextImage
						src={(event.image as Media).url!}
						alt={event.title}
						className="inset-0 h-full w-full rounded-[20px] object-contain"
						width={340}
						height={316}
						onLoad={() => setImageLoading(false)}
					/>
				</div>
				<NextImage
					src={`${process.env.NEXT_PUBLIC_WEB_URL}${(event.image as Media).url}`}
					alt={event.title}
					fill
					className="rounded-[20px] object-center"
					data-loaded="false"
				/>
				<h2 className="absolute left-[50%] top-4 mb-2 w-[90%] translate-x-[-50%] bg-black/70 text-center text-lg font-semibold text-white lg:text-2xl">
					{event.title}
				</h2>

				<div className="absolute bottom-4 right-4 ml-auto mt-4 rounded-full bg-white px-4 py-2 font-bold text-black transition-colors">
					{event.category}
				</div>

				{/* Back */}
				<div className="flip-card-back absolute h-full w-full rounded-[20px] [backface-visibility:hidden] [transform:rotateY(180deg)]">
					<div className="flex h-full w-full flex-col items-center justify-between rounded-[20px] border border-gray-900 bg-cyan-100 p-4 shadow-[0_8px_24px_0_rgba(9,76,77,0.3)]">
						<h2 className="mb-2 w-full bg-black text-center text-lg font-semibold text-white lg:text-2xl">
							{event.title}
						</h2>
						<p className="font-medium">{event.description}</p>
						<div className="ml-auto mt-4 rounded-full bg-white px-4 py-2 font-bold text-black transition-colors">
							{event.category}
						</div>
					</div>
				</div>
			</div>
		</li>
	);
}
