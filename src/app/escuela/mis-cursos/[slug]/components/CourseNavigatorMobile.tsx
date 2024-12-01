'use client';

import NextImage from 'next/image';
import NextLink from 'next/link';
import { useParams, useRouter } from 'next/navigation';

/* Types */
import type { Course } from '@/payload-types';

/* Components */
import CourseItem from './CourseItem';
import CourseViewerMobileTabs from './CourseViewerMobileTabs';
import CourseNavigatorMobileFooter from './CourseNavigatorMobileFooter';

/* Utils */
import { cn } from '@/lib/utils/classNames';

/* Assets */
import CloseIcon from '@images/icons/close.svg';
import VideoIcon from '@images/icons/video.svg';
import PencilIcon from '@images/icons/pencil.svg';
import BookIcon from '@images/icons/book.svg';

interface CourseNavigatorMobileProps {
	course: Course;
	currentBlock: number;
	currentLesson: number;
	totalBlocks: number;
	totalLessons: number;
	isShowingIndex: boolean;
}

export default function CourseNavigatorMobile({
	course,
	currentBlock,
	currentLesson,
	totalBlocks,
	totalLessons,
	isShowingIndex,
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

	/* Handlers */
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

	const openIndex = () => {
		const currentUrl = new URL(window.location.href);
		currentUrl.searchParams.set('index', 'false');
		router.push(currentUrl.toString());
		// Unlock body scroll
		// document.body.style.overflow = 'auto';
	};

	const getLessonIcon = (lesson: { blockType: string }) => {
		if (lesson.blockType === 'video') {
			return <NextImage src={VideoIcon as string} alt="Video" width={16} height={16} />;
		}

		if (lesson.blockType === 'exercise') {
			return <NextImage src={PencilIcon as string} alt="Ejercicio" width={16} height={16} />;
		}

		if (lesson.blockType === 'additional-material') {
			return <NextImage src={BookIcon as string} alt="Recurso" width={16} height={16} />;
		}

		return null;
	};

	const getLessonType = (lesson: { blockType: string }) => {
		if (lesson.blockType === 'video') {
			return 'Video:';
		}

		if (lesson.blockType === 'exercise') {
			return 'Ejercicio:';
		}

		if (lesson.blockType === 'additional-material') {
			return 'Recursos:';
		}

		return null;
	};

	return (
		<div className="relative h-full bg-cyan-25 lg:hidden">
			<header className="container bg-cyan-100 pt-3">
				<h1 className="text-xl font-bold text-gray-800">{course.name}</h1>
			</header>
			<div className="flex flex-col items-center justify-center">
				<CourseViewerMobileTabs tabs={tabs} />
				{!isShowingIndex && (
					<CourseNavigatorMobileFooter
						canGoBack={canGoBack}
						canGoForward={canGoForward}
						onGoBack={goToPreviousLesson}
						onGoForward={goToNextLesson}
					/>
				)}
			</div>
			<nav
				className={cn(
					'container fixed inset-0 bottom-0 z-50 h-full overflow-scroll py-5 transition-all duration-300',
					isShowingIndex ? 'h-full bg-cyan-50' : 'hidden h-0',
				)}
			>
				<button onClick={openIndex} className="absolute right-5 top-5">
					<NextImage src={CloseIcon as string} alt="Cerrar" />
				</button>
				<div className="mt-16">
					<p className="text-xl font-bold text-gray-800">{course.name}</p>

					<div className="pt-3">
						<ul>
							{course.blocks.map((block, index) => {
								return (
									<li key={block.id} className="ml-5 mt-4">
										<header>
											<span className="text-sm font-medium">Bloque {index + 1}</span>
											<span className="text-sm"> - {block.name}</span>
										</header>

										{block.content && (
											<ul>
												{block.content.map((lesson, number) => {
													console.log(lesson);
													return (
														<NextLink
															href={`/escuela/mis-cursos/${slug as string}?block=${index}&lesson=${number}`}
															key={lesson.id}
															className="mt-1 flex pt-3"
														>
															<div className="mr-2 flex items-center gap-2">
																{getLessonIcon(lesson)}

																<span className="justify-start font-bold text-gray-700">
																	{getLessonType(lesson)}
																</span>
															</div>

															<span className="ml-1 w-64 truncate">{lesson.blockName}</span>
														</NextLink>
													);
												})}
											</ul>
										)}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}
