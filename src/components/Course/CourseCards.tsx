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
			<h2 className="text-3xl font-bold mt-10">Talleres</h2>
			<ul className="mt-2 flex flex-wrap justify-center gap-[20px] lg:mt-12 lg:justify-start lg:gap-8">
				{talleres.map((course) => (
					<CourseCard key={course.id} course={course} isAcademy={isAcademy} />
				))}
			</ul>

			<h2 className="text-3xl font-bold mt-10">Seminarios</h2>
			<ul className="mt-2 flex flex-wrap justify-center gap-[20px] lg:mt-12 lg:justify-start lg:gap-8">
				{seminarios.map((course) => (
					<CourseCard key={course.id} course={course} isAcademy={isAcademy} />
				))}
			</ul>

			<h2 className="text-3xl font-bold mt-10">Laboratorios</h2>
			<ul className="mt-2 flex flex-wrap justify-center gap-[20px] lg:mt-12 lg:justify-start lg:gap-8">
				{laboratorios.map((course) => (
					<CourseCard key={course.id} course={course} isAcademy={isAcademy} />
				))}
			</ul>
		</>
	);
}
