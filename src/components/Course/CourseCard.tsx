import NextImage from 'next/image';
import NextLink from 'next/link';

/* Icons */
import arrowRight from '@images/icons/arrow-right.svg';

/* Types */
import type { Course } from '@/payload/payload-types';
import { cn } from '@/lib/utils/classNames';

export interface CardCoursesProps {
	course: Course & { isPending?: boolean };
	isAcademy?: boolean;
}

export default function CourseCard({ course, isAcademy = false }: CardCoursesProps) {
	return (
		<li
			key={course.id}
			className={cn(
				'flex w-[320px] flex-col rounded-2xl border border-solid border-gray-900 bg-white shadow-lg transition-transform ease-in-out will-change-transform hover:scale-[1.03] active:border-cyan-600 lg:w-[356px]',
				{ 'pointer-events-none': course.isPending },
			)}
		>
			<NextLink href={isAcademy ? `/escuela/cursos/${course.slug}` : `/cursos/${course.slug}`}>
				{/* Card Image */}
				<div className="relative h-[180px] w-full lg:h-[200px]">
					{course.image && typeof course.image !== 'number' && (
						<NextImage
							alt={course.image.alt}
							className="rounded-t-2xl object-cover"
							fill
							src={`${process.env.NEXT_PUBLIC_WEB_URL}${course.image.url!}`}
							quality={66}
						/>
					)}

					{course.isPending && (
						<div className="absolute top-[50%] left-[50%] h-full w-full -translate-x-[50%] -translate-y-[50%] rounded-t-2xl z-10">
							<span className="bg-yellow-200 p-4 font-bold text-black absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full text-center uppercase">
								Pago Pendiente
							</span>
						</div>
					)}

					{/* Category Badge */}
					{course.category && (
						<aside className="absolute right-2 top-2 rounded-full bg-cyan-100 px-4 py-2 font-bold text-black">
							{course.category}
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
				<div className="h-[156px] px-4 py-2 lg:h-[171px] lg:py-4 relative">
					<header className="max-w-[80%]">
						<strong className="text-[20px]">{course.name}</strong>
					</header>
					{course.shortDescription && (
						<p className="mt-2 line-clamp-3 text-ellipsis">{course.shortDescription}</p>
					)}
				</div>

				{course.isPending && (
					<div className="absolute inset-0 h-full rounded-2xl w-full bg-black/60 p-4" aria-hidden />
				)}

				{/* Card Footer */}
				{!course.isPending && (
					<footer className="w-full px-4 py-2 lg:py-4">
						<NextImage
							alt="Ver detalle de Curso"
							className="ml-auto h-[20px] w-[20px]"
							src={arrowRight}
						/>
					</footer>
				)}
			</NextLink>
		</li>
	);
}
