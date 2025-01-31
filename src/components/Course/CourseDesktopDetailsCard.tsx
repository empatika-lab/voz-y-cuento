'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import NextImage from 'next/image';

/* Components */
import Button from '@/components/Button';

/* Types */
import type { Course } from '@/payload-types';

/* Utils */
import ROUTES from '@/lib/utils/routes';

/* Actions */
import { setBuyCourseRedirection } from '@/app/(frontend)/(auth)/ingresar/actions/setBuyCourseRedirection';

interface CourseDesktopDetailsCardProps {
	course: Course;
	features: { id: number; label: string; icon: string }[];
	tryAddPendingPayment?: (studentId: number, courseId: number) => Promise<boolean>;
	studentId?: number;
}

export default function CourseDesktopDetailsCard({
	course,
	features,
	studentId,
	tryAddPendingPayment,
}: CourseDesktopDetailsCardProps) {
	const [isPendingPayment, setIsPendingPayment] = useState(false);

	/* Hooks */
	const router = useRouter();
	const pathname = usePathname();
	const ctaText = pathname?.includes('escuela') ? 'Comprar' : 'Inscribirme';
	const ctLink = pathname?.includes('escuela')
		? `/escuela/cursos/${course.slug}/comprar`
		: `${ROUTES.LOGIN}`;

	/* Helpers */
	function getCourseLabel(category: Course['category']) {
		switch (category) {
			case 'Seminario':
				return 'Seminario';
			case 'Laboratorio':
				return 'Laboratorio';
			default:
				return 'Curso';
		}
	}

	return (
		<article className="sticky top-4">
			<div className="p4 rounded-t-2xl bg-cyan-25 px-8 pt-8 shadow-xl">
				<h2 className="text-pretty text-center text-2xl font-bold">
					{getCourseLabel(course.category)} <br /> {course.name}
				</h2>

				{/* Características de los cursos */}
				<ul className="p-8">
					{features.map((feature) => {
						return (
							<li key={feature.id} className="mt-4 flex gap-4 font-medium [&:first-of-type]:mt-0">
								<NextImage alt={feature.label} height={16} src={feature.icon} width={16} />
								<p>{feature.label}</p>
							</li>
						);
					})}
				</ul>
			</div>

			{/* Inscripción */}
			<footer className="flex flex-col gap-8 rounded-b-2xl bg-pink-50 p-8 shadow-xl">
				<div className="flex justify-between gap-2">
					<p className="w-1/2 text-xl">Residentes de Argentina</p>
					<strong className="text-xl text-pink-900">ARS ${course.arsPrice}</strong>
				</div>

				<div className="flex justify-between gap-2">
					<p className="w-1/2 text-xl">Resto del mundo</p>
					<strong className="text-xl">USD ${course.usdPrice}</strong>
				</div>

				{tryAddPendingPayment ? (
					<form>
						<Button
							className="flex items-center justify-center gap-2 bg-pink-400"
							disabled={isPendingPayment}
							type="submit"
							onClick={async () => {
								if (course.slug) {
									if (studentId && tryAddPendingPayment) {
										setIsPendingPayment(true);
										const success = await tryAddPendingPayment(studentId, course.id);
										if (success) {
											router.push(ctLink);
											setIsPendingPayment(false);
											return;
										}
										return;
									}
									void setBuyCourseRedirection(course.slug);
									router.push(ctLink);
								}
							}}
						>
							{isPendingPayment ? 'Enviando...' : ctaText}
						</Button>
					</form>
				) : (
					<Button
						className="flex items-center justify-center gap-2 bg-pink-400"
						href={ROUTES.LOGIN}
						onClick={() => {
							if (course.slug) {
								void setBuyCourseRedirection(course.slug);
							}
							router.push(ctLink);
						}}
					>
						{ctaText}
					</Button>
				)}
			</footer>
		</article>
	);
}
