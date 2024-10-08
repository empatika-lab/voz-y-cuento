'use client';
import NextImage from 'next/image';
// import NextLink from 'next/link';

/* Components */
// import EnrollButton from './components/EnrollButton';
import Button from '@/components/Button';

/* Types */
import type { CourseStudentStatus } from '@/lib/types';
import type { Course } from '@/payload/payload-types';

/* Utils */
import ROUTES from '@/lib/utils/routes';
import { usePathname } from 'next/navigation';

interface CourseDesktopDetailsCardProps {
	course: Course;
	features: { id: number; label: string; icon: string }[];
	courseStudentStatus: CourseStudentStatus;
	userIsAuthenticated: boolean;
}

export default function CourseDesktopDetailsCard({
	course,
	// courseStudentStatus,
	features,
	userIsAuthenticated,
}: CourseDesktopDetailsCardProps) {
	const pathname = usePathname();
	const ctaText = pathname?.includes('escuela') ? 'Comprar' : 'Inscribirme';

	if (!userIsAuthenticated) {
		return (
			<article>
				<div className="bg-cyan-25 rounded-t-2xl shadow-xl">
					<h2 className="text-pretty px-8 pt-8 text-center text-2xl font-bold">
						Curso <br /> {course.name}
					</h2>

					{/* Características de los cursos */}
					<ul className="mt-8 px-8 pb-8">
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

					<Button
						className="flex items-center justify-center gap-2 bg-pink-400"
						href={`${ROUTES.LOGIN}?redirect=cursos/${course.slug}`}
					>
						{ctaText}
					</Button>
				</footer>
			</article>
		);
	}
}
