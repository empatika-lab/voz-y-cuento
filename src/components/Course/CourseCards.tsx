/* Types */

import type { Course } from '@/payload/payload-types';

/* Components */
import CourseCard from './CourseCard';

interface CourseCardsProps {
	courses: (Course & { isPending?: boolean })[];
	isAcademy?: boolean;
}

export function CourseCards({ courses, isAcademy = false }: CourseCardsProps) {
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
			<h2 className="text-[32px] font-medium mt-14">Talleres</h2>
			<p className="mt-4 text-xl text-pretty">
				Aprenderás los fundamentos teóricos de manera estructurada y al mismo tiempo pondrás en
				práctica tus conocimientos a través de ejercicios prácticos.
			</p>
			<ul className="mt-2 flex flex-wrap justify-center gap-[20px] lg:mt-12 lg:justify-start lg:gap-8">
				{talleres.map((course) => (
					<CourseCard key={course.id} course={course} isAcademy={isAcademy} />
				))}
			</ul>

			<h2 className="text-3xl font-bold mt-14">Seminarios</h2>
			<p className="mt-4 text-xl text-pretty">
				Clases intensivas donde profundizarás sobre temas en especifico dentro de la narración oral.
			</p>
			<ul className="mt-2 flex flex-wrap justify-center gap-[20px] lg:mt-12 lg:justify-start lg:gap-8">
				{seminarios.map((course) => (
					<CourseCard key={course.id} course={course} isAcademy={isAcademy} />
				))}
			</ul>

			<h2 className="text-3xl font-bold mt-14">Laboratorios</h2>
			<p className="mt-4 text-xl text-pretty">
				Espacio de experimetación libre donde podrás mejorar tu práctica con el acompañamiento de la
				profesora.
			</p>
			<ul className="mt-2 flex flex-wrap justify-center gap-[20px] lg:mt-12 lg:justify-start lg:gap-8">
				{laboratorios.map((course) => (
					<CourseCard key={course.id} course={course} isAcademy={isAcademy} />
				))}
			</ul>
		</>
	);
}
