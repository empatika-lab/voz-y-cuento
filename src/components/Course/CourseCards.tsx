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
		<>
			{talleres.length > 0 && (
				<>
					<ul className="flex flex-wrap justify-center gap-[20px] md:justify-start md:gap-8 md:pt-12">
						<h2 className="mt-14 text-2xl font-medium md:text-[32px]">Talleres</h2>
						<p className="mt-2 text-pretty text-sm md:text-xl">
							Aprenderás los fundamentos teóricos de manera estructurada y al mismo tiempo pondrás
							en práctica tus conocimientos a través de ejercicios prácticos.
						</p>
						{talleres.map((course) => (
							<CourseCard key={course.id} course={course} isAcademy={isAcademy} isOwned={isOwned} />
						))}
					</ul>
				</>
			)}

			{seminarios.length > 0 && (
				<>
					<h2 className="mt-14 text-2xl font-medium lg:text-[32px]">Seminarios</h2>
					<p className="mt-2 text-pretty text-sm lg:text-xl">
						Clases intensivas donde profundizarás sobre temas en específico dentro de la narración
						oral.
					</p>

					<ul className="flex flex-wrap justify-center gap-[20px] pt-6 md:justify-start md:gap-8">
						{seminarios.map((course) => (
							<CourseCard key={course.id} course={course} isAcademy={isAcademy} />
						))}
					</ul>
				</>
			)}

			{laboratorios.length > 0 && (
				<>
					<h2 className="mt-14 text-2xl font-medium lg:text-[32px]">Laboratorios</h2>
					<p className="mt-2 text-pretty text-sm lg:text-xl">
						Espacio de experimetación libre donde podrás mejorar tu práctica con el acompañamiento
						de la profesora.
					</p>
					<ul className="flex flex-wrap justify-center gap-[20px] pt-6 md:justify-start md:gap-8 md:pt-12">
						{laboratorios.map((course) => (
							<CourseCard key={course.id} course={course} isAcademy={isAcademy} />
						))}
					</ul>
				</>
			)}
		</>
	);
}
