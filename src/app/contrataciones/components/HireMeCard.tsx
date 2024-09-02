/* Types */
import type { Event, Media } from '@/payload/payload-types';
import NextImage from 'next/image';

interface HireMeCardProps {
	event: Event;
}

export default function HireMeCard({ event }: HireMeCardProps) {
	return (
		<li className="flip-card h-[400px] w-[320px] [perspective:1000px] rounded-[20px] mx-auto lg:mx-0 ">
			<div className="flip-card-inner relative transition-transform duration-700 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)] rounded-[20px] w-[320px] h-[400px]">
				{/* Front */}
				<div className="flip-card-front absolute [backface-visibility:hidden] inset-0 w-full h-full rounded-[20px]">
					<NextImage
						src={(event.image as Media).url!}
						alt={event.title}
						className="rounded-[20px] object-cover inset-0 w-full h-full"
						width={400}
						height={320}
					/>
					<div className=" w-full h-full flex items-center justify-center">
						<h1 className="text-xl font-bold">{event.title}</h1>
					</div>
				</div>
				<NextImage
					src={(event.image as Media).url!}
					alt={event.title}
					fill
					className="rounded-[20px] object-center"
				/>
				{/* Back */}
				<div className="flip-card-back absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[20px]">
					<div className="border-gray-900 border shadow-[0_8px_24px_0_rgba(9,76,77,0.3)] p-4 w-full h-full flex flex-col items-center justify-between bg-cyan-100 rounded-[20px]">
						<h2 className="text-lg font-semibold mb-2 bg-black w-full text-white text-center lg:text-2xl">
							{event.title}
						</h2>
						<p className="font-medium">{event.description}</p>
						<div className="mt-4 px-4 rounded-full py-2 font-bold text-black transition-colors ml-auto bg-red-50">
							{event.level}
						</div>
					</div>
				</div>
			</div>
		</li>
	);
}
