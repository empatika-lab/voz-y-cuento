/* Types */
import { Course } from '@voz-y-cuento/types';

/* Components */
import CourseCard from './CourseCard';

interface CourseCardsProps {
	courses: { data: Course[] };
}

export function CourseCards({ courses }: CourseCardsProps) {
	return (
		<ul className="mt-2 flex flex-wrap justify-center gap-[20px] lg:mt-12 lg:justify-start lg:gap-8">
			{courses.data.map((course) => (
				<CourseCard key={course.id} course={course} />
			))}
		</ul>
	);
}
