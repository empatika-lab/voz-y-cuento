'use client';
import { useState } from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';

/* Icons */
import arrowRight from '@images/icons/arrow-right.svg';

/* Types */
import type { Course } from '@/payload-types';

/* Utils */
import { cn } from '@/lib/utils/classNames';

export interface CardCoursesProps {
	course: Course & { isPending?: boolean };
	isAcademy?: boolean;
	isOwned?: boolean;
}

export default function CourseCard({
	course,
	isAcademy = false,
	isOwned = false,
}: CardCoursesProps) {
	const [imageLoading, setImageLoading] = useState(true);

	/* Helpers */
	function getLink() {
		if (course.isComingSoon) {
			return '';
		}

		if (!isAcademy) {
			return `/cursos/${course.slug}`;
		}

		return isOwned ? `/escuela/mis-cursos/${course.slug}` : `/escuela/cursos/${course.slug}`;
	}
	return (
		<li
			key={course.id}
			className={cn(
				'flex h-[372px] w-[320px] flex-col rounded-2xl border border-solid border-gray-900 bg-white shadow-lg transition-transform ease-in-out will-change-transform hover:scale-[1.03] active:border-cyan-600 lg:h-[445px] lg:w-[356px]',
				{ 'pointer-events-none': course.isPending, 'hover:scale-1': course.isComingSoon },
			)}
		>
			<NextLink
				href={course.isComingSoon ? '' : getLink()}
				className={cn('h-full', { 'pointer-events-none': course.isComingSoon })}
			>
				{/* Card Image */}
				<div className="relative mx-auto h-[180px] w-full lg:h-[200px] lg:w-[354px]">
					{imageLoading && (
						<div className="absolute inset-0 animate-shimmer rounded-t-2xl bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-[length:400%_100%]" />
					)}
					{course.image && typeof course.image !== 'number' && (
						<NextImage
							alt={course.image.alt ?? ''}
							className="rounded-t-2xl object-cover"
							fill
							src={`${process.env.NEXT_PUBLIC_WEB_URL}${course.image.url!}`}
							quality={66}
							onLoad={() => setImageLoading(false)}
						/>
					)}

					{course.isPending && (
						<div className="absolute left-[50%] top-[50%] z-10 h-full w-full -translate-x-[50%] -translate-y-[50%] rounded-t-2xl">
							<span className="absolute left-[50%] top-[50%] w-full -translate-x-[50%] -translate-y-[50%] bg-yellow-200 p-4 text-center font-bold uppercase text-black">
								Pago Pendiente
							</span>
						</div>
					)}

					{/* Free Course Badge */}
					{course.isFree && (
						<aside className="absolute bottom-2 right-2 rounded-full bg-gray-700/75 px-4 py-2 text-sm font-bold text-white">
							Gratis
						</aside>
					)}
				</div>

				{/* Card Content */}
				<div className="relative h-[156px] px-4 py-2 lg:h-[171px] lg:py-4">
					<header className="max-w-[80%]">
						<strong className="text-[20px]">{course.name}</strong>
					</header>
					{course.shortDescription && (
						<p className="mt-2 line-clamp-3 text-ellipsis font-medium">{course.shortDescription}</p>
					)}
				</div>

				{course.isPending && (
					<div className="absolute inset-0 h-full w-full rounded-2xl bg-black/60 p-4" aria-hidden />
				)}

				{course.isComingSoon && (
					<div
						className="absolute left-0 top-0 flex w-full justify-center rounded-t-2xl bg-yellow-50/80 p-4 text-center font-bold tracking-wide text-black"
						aria-hidden
					>
						PRÓXIMAMENTE
					</div>
				)}

				{/* Card Footer */}
				{!course.isPending && !course.isComingSoon && (
					<footer className="mb-10 w-full px-4 py-2 lg:py-4">
						<NextImage
							alt="Ver detalle de Curso"
							className="ml-auto h-[20px] w-[20px]"
							src={arrowRight as string}
						/>
					</footer>
				)}
			</NextLink>
		</li>
	);
}
