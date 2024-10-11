import NextImage from 'next/image';

/* Types */
import type { Course, Media } from '@/payload/payload-types';

interface BuyCourseCardProps {
	course: Course;
}

export default function BuyCourseCard({ course }: BuyCourseCardProps) {
	return (
		<article className="flex flex-col lg:flex-row p-5 rounded-xl border-gray-400 border mt-12">
			<div className="flex gap-8 lg:gap-0">
				<div className="w-[122px] h-[122px] relative">
					<NextImage
						src={(course.image as Media).url!}
						alt={course.name}
						fill
						className="rounded-lg shadow-2xl w-full h-full object-cover"
						priority
					/>
				</div>

				<header className="flex-0 mt-3 ml-auto lg:ml-[50px]">
					<h1 className="flex flex-col">
						<span className="lg:font-bold text-sm lg:text-lg">Curso</span>
						<span className="font-bold text-sm lg:text-lg mt-3">{course.name}</span>
					</h1>
				</header>
			</div>

			<div className="flex-1 flex flex-col ml-auto text-right lg:justify-between text-[28px]">
				<p className="font-bold text-pink-900 text-xl">ARS ${course.arsPrice}</p>
				<p className="text-sm lg:flex lg:flex-col lg:items-end lg:justify-en">
					<span className="font-bold ">USD ${course.usdPrice}</span>
					<span className="text-grey-400 mt-3 lg:mt-0"> (fuera de Argentina)</span>
				</p>
			</div>
		</article>
	);
}
