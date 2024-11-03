/* Types */
import type { Course } from '@/payload-types';

/* Components */
import CourseItem from '@/components/Course/CourseItem';
import CourseViewerMobileTabs from '@/components/Course/CourseViewerMobileTabs';

export default function CourseNavigatorMobile({
	course,
	currentBlock,
}: {
	course: Course;
	currentBlock: number;
}) {
	if (!course.blocks?.[currentBlock]) {
		return null;
	}

	const tabs = [
		{
			label: 'Clase',
			Component: <div>Clase</div>,
		},
		{
			label: 'Comentarios',
			Component: <div>Comentarios</div>,
		},
	];

	return (
		<div className="lg:hidden">
			<div className="flex flex-col items-center justify-center">
				<CourseItem block={course.blocks[currentBlock]} key={course.blocks[currentBlock].id} />
				<CourseViewerMobileTabs tabs={tabs} />
			</div>
		</div>
	);
}
