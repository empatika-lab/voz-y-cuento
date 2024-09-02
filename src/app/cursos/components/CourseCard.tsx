import NextImage from 'next/image';
import NextLink from 'next/link';

/* Icons */
import arrowRight from '@images/icons/arrow-right.svg';

/* Types */
import type { Course } from '@/payload/payload-types';

export interface CardCoursesProps {
	course: Course;
}

export default function CardCourse({ course }: CardCoursesProps) {
	return (
		<li
			key={course.id}
			className="flex w-[320px] flex-col rounded-2xl border border-solid border-gray-900 bg-white shadow-lg transition-transform ease-in-out will-change-transform hover:scale-[1.03] active:border-cyan-600 lg:w-[356px]"
		>
			<NextLink href={`/cursos/${course.slug}`}>
				{/* Card Image */}
				<div className="relative h-[180px] w-full lg:h-[200px]">
					{course.image && typeof course.image !== 'number' && (
						<NextImage
							alt={course.image.alt}
							className="rounded-t-2xl object-cover"
							fill
							src={course.image.url!}
						/>
					)}

					{/* Category Badge */}
					{course.category && (
						<aside className="absolute right-2 top-2 rounded-full bg-cyan-100 px-4 py-2 font-bold text-black">
							{course.category}!
						</aside>
					)}

					{/* Free Course Badge */}
					{course.isFree && (
						<aside className="absolute bottom-2 right-2 rounded-full bg-gray-700/75 px-4 py-2 text-sm font-bold text-white">
							Gratis
						</aside>
					)}
				</div>

				{/* Card Content */}
				<div className="h-[156px] px-4 py-2 lg:h-[171px] lg:py-4">
					<header className="max-w-[80%]">
						<strong className="text-[20px]">{course.name}</strong>
					</header>
					{course.shortDescription && (
						<p className="mt-2 line-clamp-3 text-ellipsis">{course.shortDescription}</p>
					)}
				</div>

				{/* Card Footer */}
				<footer className="w-full px-4 py-2 lg:py-4">
					<NextImage
						alt="Ver detalle de Curso"
						className="ml-auto h-[20px] w-[20px]"
						src={arrowRight}
					/>
				</footer>
			</NextLink>
		</li>
	);
}
