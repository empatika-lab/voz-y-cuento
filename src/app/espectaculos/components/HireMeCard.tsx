/* Types */
import type { Event, Media } from '@/payload/payload-types';
import NextImage from 'next/image';

interface HireMeCardProps {
	event: Event;
}

export default function HireMeCard({ event }: HireMeCardProps) {
	return (
		<li className="flip-card w-[340px] h-[316px] [perspective:1000px] rounded-[20px] lg:mx-0 group">
			<div className="flip-card-inner relative transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-[20px] w-[340px] h-[316px]">
				{/* Front */}
				<div className="flip-card-front absolute [backface-visibility:hidden] inset-0 w-full h-full rounded-[20px]">
					<NextImage
						src={(event.image as Media).url!}
						alt={event.title}
						className="rounded-[20px] object-contain inset-0 w-full h-full"
						width={340}
						height={316}
					/>
				</div>
				<NextImage
					src={`${process.env.NEXT_PUBLIC_WEB_URL}${(event.image as Media).url}`}
					alt={event.title}
					fill
					className="rounded-[20px] object-center"
				/>
				<h2 className="absolute top-4 w-[90%]  text-lg font-semibold mb-2 bg-black/70 left-[50%] translate-x-[-50%] text-white text-center lg:text-2xl">
					{event.title}
				</h2>
				{/* Back */}
				<div className="flip-card-back absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[20px]">
					<div className="border-gray-900 border shadow-[0_8px_24px_0_rgba(9,76,77,0.3)] p-4 w-full h-full flex flex-col items-center justify-between bg-cyan-100 rounded-[20px]">
						<h2 className="text-lg font-semibold mb-2 bg-black w-full text-white text-center lg:text-2xl">
							{event.title}
						</h2>
						<p className="font-medium">{event.description}</p>
						<div className="mt-4 px-4 rounded-full py-2 font-bold text-black transition-colors ml-auto bg-red-50">
							{event.category}
						</div>
					</div>
				</div>
			</div>
		</li>
	);
}
