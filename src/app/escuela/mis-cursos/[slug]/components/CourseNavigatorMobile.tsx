'use client';

import { useParams, useRouter } from 'next/navigation';

/* Types */
import type { Course } from '@/payload-types';

/* Components */
import CourseItem from './CourseItem';
import CourseViewerMobileTabs from './CourseViewerMobileTabs';
import CourseNavigatorMobileFooter from './CourseNavigatorMobileFooter';

interface CourseNavigatorMobileProps {
	course: Course;
	currentBlock: number;
	currentLesson: number;
	totalBlocks: number;
	totalLessons: number;
}

export default function CourseNavigatorMobile({
	course,
	currentBlock,
	currentLesson,
	totalBlocks,
	totalLessons,
}: CourseNavigatorMobileProps) {
	// Hooks
	const { slug } = useParams();
	const router = useRouter();

	if (!slug || !course.blocks?.[currentBlock]?.content?.[currentLesson]) {
		return null;
	}

	// Helpers
	const tabs = [
		{
			label: 'Clase',
			Component: (
				<CourseItem
					lesson={course.blocks[currentBlock].content[currentLesson]}
					key={course.blocks[currentBlock].id}
				/>
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

	const canGoForward = currentLesson < totalLessons - 1 || currentBlock < totalBlocks - 1;
	const canGoBack = currentLesson > 0 || currentBlock > 0;

	/* Methods */
	const goToNextLesson = () => {
		if (currentLesson < totalLessons - 1) {
			router.push(
				`/escuela/mis-cursos/${slug as string}?block=${currentBlock}&lesson=${currentLesson + 1}`,
			);
		} else if (currentBlock < totalBlocks - 1) {
			router.push(`/escuela/mis-cursos/${slug as string}?block=${currentBlock + 1}&lesson=${1}`);
		}
	};

	const goToPreviousLesson = () => {
		if (currentLesson > 0) {
			router.push(
				`/escuela/mis-cursos/${slug as string}?block=${currentBlock}&lesson=${currentLesson - 1}`,
			);
		} else if (currentBlock > 0) {
			router.push(
				`/escuela/mis-cursos/${slug as string}?block=${currentBlock}&lesson=${totalLessons - 1}`,
			);
		}
	};

	return (
		<div className="h-full bg-cyan-25 lg:hidden">
			<header className="container bg-cyan-100 pt-3">
				<h1 className="text-xl font-bold text-gray-800">{course.name}</h1>
			</header>
			<div className="flex flex-col items-center justify-center">
				<CourseViewerMobileTabs tabs={tabs} />
				<CourseNavigatorMobileFooter
					canGoBack={canGoBack}
					canGoForward={canGoForward}
					onGoBack={goToPreviousLesson}
					onGoForward={goToNextLesson}
				/>
			</div>
		</div>
	);
}
