/* Types */
import type { Course } from '@/payload-types';

/* Components */
import CourseCard from './CourseCard';

interface CourseCardsProps {
	courses: (Course & { isPending?: boolean })[];
	isAcademy?: boolean;
	isOwned?: boolean;
}

export function CourseCards({ courses, isAcademy = false, isOwned = false }: CourseCardsProps) {
	const {
		Laboratorio: laboratorios,
		Seminario: seminarios,
		Taller: talleres,
	} = courses.reduce(
		(acc, course) => {
			// eslint-disable-next-line no-param-reassign
			acc[course.category] = acc[course.category] || [];
			acc[course.category].push(course);
			return acc;
		},
		{ Laboratorio: [], Seminario: [], Taller: [] } as Record<
			string,
			(Course & { isPending?: boolean })[]
		>,
	);

	return (
		<div className="flex flex-col gap-12">
			{talleres.length > 0 && (
				<ul className="flex flex-wrap md:flex-col md:justify-start md:gap-4">
					<h2 className="mt-6 text-2xl font-medium md:text-[32px]">Talleres</h2>
					<p className="mb-6 mt-2 text-pretty text-sm font-medium md:text-xl lg:mt-0">
						Aprenderás los fundamentos teóricos y al mismo tiempo pondrás en práctica tus
						conocimientos a través de ejercicios prácticos.
					</p>
					<ul className="flex flex-col gap-5 md:flex-row md:flex-wrap">
						{talleres.map((course) => (
							<CourseCard
								key={`${course.category}-${course.id}`}
								course={course}
								isAcademy={isAcademy}
								isOwned={isOwned}
							/>
						))}
					</ul>
				</ul>
			)}

			{seminarios.length > 0 && (
				<ul className="flex flex-wrap md:flex-col md:justify-start md:gap-4">
					<h2 className="mt-6 text-2xl font-medium md:text-[32px]">Seminarios</h2>
					<p className="mb-6 mt-2 text-pretty text-sm font-medium md:text-xl lg:mt-0">
						Clases intensivas donde profundizarás sobre temas en específico dentro de la narración
						oral.
					</p>
					<ul className="flex flex-col gap-5 md:flex-row md:flex-wrap">
						{seminarios.map((course) => (
							<CourseCard
								key={`${course.category}-${course.id}`}
								course={course}
								isAcademy={isAcademy}
								isOwned={isOwned}
							/>
						))}
					</ul>
				</ul>
			)}

			{laboratorios.length > 0 && (
				<ul className="flex flex-wrap md:justify-start md:gap-4">
					<h2 className="mt-6 text-2xl font-medium md:text-[32px]">Laboratorios</h2>
					<p className="mb-6 mt-2 text-pretty text-sm font-medium md:text-xl lg:mt-0">
						Espacio de experimetación libre donde podrás mejorar tu práctica con el acompañamiento
						de la profesora.
					</p>
					<ul className="flex flex-col gap-5 md:flex-row md:flex-wrap">
						{laboratorios.map((course) => (
							<CourseCard
								key={`${course.category}-${course.id}`}
								course={course}
								isAcademy={isAcademy}
								isOwned={isOwned}
							/>
						))}
					</ul>
				</ul>
			)}
		</div>
	);
}
