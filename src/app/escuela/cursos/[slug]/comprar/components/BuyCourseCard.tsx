import NextImage from 'next/image';

/* Types */
import type { Course, Media } from '@/payload-types';

interface BuyCourseCardProps {
	course: Course;
}

export default function BuyCourseCard({ course }: BuyCourseCardProps) {
	return (
		<article className="mt-12 flex flex-col rounded-xl border border-gray-400 p-5 lg:flex-row">
			<div className="flex gap-8 lg:gap-0">
				<div className="relative h-[122px] w-[122px]">
					<NextImage
						src={(course.image as Media).url!}
						alt={course.name}
						fill
						className="h-full w-full rounded-lg object-cover shadow-2xl"
						priority
					/>
				</div>

				<header className="flex-0 ml-auto mt-3 lg:ml-[50px]">
					<h1 className="flex flex-col">
						<span className="text-sm lg:text-lg lg:font-bold">Curso</span>
						<span className="mt-3 text-sm font-bold lg:text-lg">{course.name}</span>
					</h1>
				</header>
			</div>

			<div className="ml-auto flex flex-1 flex-col text-right text-[28px] lg:justify-between">
				<p className="text-xl font-bold text-pink-900">ARS ${course.arsPrice}</p>
				<p className="lg:justify-en text-sm lg:flex lg:flex-col lg:items-end">
					<span className="font-bold">USD ${course.usdPrice}</span>
					<span className="text-grey-400 mt-3 lg:mt-0"> (fuera de Argentina)</span>
				</p>
			</div>
		</article>
	);
}
