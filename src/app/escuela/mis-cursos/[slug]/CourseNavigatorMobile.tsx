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
			Component: (
				<CourseItem block={course.blocks[currentBlock]} key={course.blocks[currentBlock].id} />
			),
			isEnabled: true,
		},
		{
			label: 'Comentarios',
			Component: <p>Comentarios</p>,
			isEnabled: true,
		},
		{
			label: 'Archivo',
			Component: <p>Archivo</p>,
			isEnabled: false,
		},
	];

	return (
		<div className="bg-cyan-100 lg:hidden">
			<header className="container py-3">
				<h1 className="text-xl font-bold text-gray-800">{course.name}</h1>
			</header>
			<div className="flex flex-col items-center justify-center">
				<CourseViewerMobileTabs tabs={tabs} />
			</div>
		</div>
	);
}
