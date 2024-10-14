/* Types */

import type { Course } from '@/payload/payload-types';

/* Components */
import CourseCard from './CourseCard';

interface CourseCardsProps {
	courses: (Course & { isPending?: boolean })[];
	isAcademy?: boolean;
}

export function CourseCards({ courses, isAcademy = false }: CourseCardsProps) {
	return (
		<ul className="mt-2 flex flex-wrap justify-center gap-[20px] lg:mt-12 lg:justify-start lg:gap-8">
			{courses.map((course) => (
				<CourseCard key={course.id} course={course} isAcademy={isAcademy} />
			))}
		</ul>
	);
}
