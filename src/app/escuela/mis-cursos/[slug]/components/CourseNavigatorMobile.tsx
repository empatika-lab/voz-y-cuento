'use client';

import { use, useEffect, useRef } from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useParams, useRouter } from 'next/navigation';

/* Types */
import type { Course } from '@/payload-types';

/* Components */
import CourseItem from './CourseItem';
import CourseViewerMobileTabs from './CourseViewerMobileTabs';
import CourseNavigatorMobileFooter from './CourseNavigatorMobileFooter';
import CourseLessonComments from './CouseLessonComments';

/* Utils */
import { cn } from '@/lib/utils/classNames';

/* Assets */
import CloseIcon from '@images/icons/close.svg';
import VideoIcon from '@images/icons/video.svg';
import PencilIcon from '@images/icons/pencil.svg';
import BookIcon from '@images/icons/book.svg';
import CheckedIcon from '@images/icons/checked-circle.svg';
import UncheckedIcon from '@images/icons/unchecked-circle.svg';

/* Context */
import { WatchedLessonContext } from '../context/WatchedLessonContext';

/* Utils */
import { markCourseLessonAsViewed, unmarkCourseLessonAsViewed } from '@/lib/utils/course';
import { useCourseTabsIndexContext } from '../context/CourseTabsIndexContext';

interface CourseNavigatorMobileProps {
	course: Course;
	currentBlock: number;
	currentLesson: number;
	totalBlocks: number;
	totalLessons: number;
	isShowingIndex: boolean;
	studentId: number;
	user: { id: string; email: string; name: string; courses: number[] };
}

export default function CourseNavigatorMobile({
	course,
	currentBlock,
	currentLesson,
	totalBlocks,
	totalLessons,
	studentId,
	isShowingIndex,
	user,
}: CourseNavigatorMobileProps) {
	/* Hooks */
	const { slug } = useParams();
	const router = useRouter();

	/* Context */
	const { watchedLessons, fetchWatchedLessons } = use(WatchedLessonContext);
	const { currentTabIndex, setCurrentTabIndex } = useCourseTabsIndexContext();
	/* Refs */
	const canMarkLessonAsViewed = useRef(false);

	/* Effects */
	useEffect(() => {
		if (course.id && studentId) {
			void fetchWatchedLessons(studentId, course.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [course.id, studentId, currentBlock, currentLesson]);

	useEffect(() => {
		setTimeout(() => {
			canMarkLessonAsViewed.current = true;
		}, 5000);
	}, [course.blocks, course.id, currentBlock, currentLesson, studentId]);

	if (!slug || !course.blocks?.[currentBlock]?.content?.[currentLesson]) {
		return null;
	}

	/* Helpers */
	const tabs = [
		{
			label: 'Clase',
			Component: (
				<CourseItem
					lesson={course.blocks[currentBlock].content[currentLesson]}
					key={course.blocks[currentBlock].id}
					blockId={course.blocks[currentBlock].id!}
					studentId={studentId}
					courseId={course.id}
				/>
			),
			isEnabled: true,
		},
		{
			label: 'Comentarios',
			Component: (
				<CourseLessonComments
					courseId={course.id.toString()}
					blockId={course.blocks[currentBlock].id!}
					lessonId={course.blocks[currentBlock].content[currentLesson].id!}
					author={user.name}
				/>
			),
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
		const lesson = course.blocks?.[currentBlock]?.content?.[currentLesson];

		if (!lesson) {
			return;
		}

		if (canMarkLessonAsViewed.current) {
			markCourseLessonAsViewed(course.id, studentId, course.blocks![currentBlock].id!, lesson.id!)
				.then(() => {
					void fetchWatchedLessons(studentId, course.id);
				})
				.catch((error) => {
					// eslint-disable-next-line no-console
					console.error('Error marking lesson as viewed:', error);
				});
		}

		if (currentLesson < totalLessons - 1) {
			router.push(
				`/escuela/mis-cursos/${slug as string}?block=${currentBlock}&lesson=${currentLesson + 1}`,
			);
		} else if (currentBlock < totalBlocks - 1) {
			router.push(`/escuela/mis-cursos/${slug as string}?block=${currentBlock + 1}&lesson=${1}`);
		}

		if (currentTabIndex > 0) {
			setCurrentTabIndex(0);
		}
	};

	const goToPreviousLesson = () => {
		const lesson = course.blocks?.[currentBlock]?.content?.[currentLesson];

		if (!lesson) {
			return;
		}

		if (!canMarkLessonAsViewed.current) {
			return;
		}

		markCourseLessonAsViewed(course.id, studentId, course.blocks![currentBlock].id!, lesson.id!)
			.then(() => {
				void fetchWatchedLessons(studentId, course.id);
			})
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.error('Error marking lesson as viewed:', error);
			});

		if (currentLesson > 0) {
			router.push(
				`/escuela/mis-cursos/${slug as string}?block=${currentBlock}&lesson=${currentLesson - 1}`,
			);
		} else if (currentBlock > 0) {
			router.push(
				`/escuela/mis-cursos/${slug as string}?block=${currentBlock}&lesson=${totalLessons - 1}`,
			);
		}

		if (currentTabIndex > 0) {
			setCurrentTabIndex(0);
		}
	};

	const openIndex = () => {
		const currentUrl = new URL(window.location.href);
		currentUrl.searchParams.set('index', 'false');
		router.push(currentUrl.toString());
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
			return 'Video';
		}

		if (lesson.blockType === 'exercise') {
			return 'Ejercicio';
		}

		if (lesson.blockType === 'additional-material') {
			return 'Recursos';
		}

		return null;
	};

	const handleLessonViewedClick = (isViewed: boolean, lessonId: string) => {
		if (isViewed) {
			unmarkCourseLessonAsViewed(course.id, studentId, course.blocks![currentBlock].id!, lessonId)
				.then(() => {
					void fetchWatchedLessons(studentId, course.id);
				})
				.catch((error) => {
					// eslint-disable-next-line no-console
					console.error('Error unmarking lesson as viewed:', error);
				});
		} else {
			markCourseLessonAsViewed(course.id, studentId, course.blocks![currentBlock].id!, lessonId)
				.then(() => {
					void fetchWatchedLessons(studentId, course.id);
				})
				.catch((error) => {
					// eslint-disable-next-line no-console
					console.error('Error marking lesson as viewed:', error);
				});
		}
	};

	return (
		<div className="relative h-full bg-cyan-25 lg:hidden">
			<header className="bg-cyan-100 pt-3">
				<h1 className="container text-xl font-bold text-gray-800">{course.name}</h1>
			</header>
			<div className="flex flex-col items-center justify-center bg-cyan-100">
				<CourseViewerMobileTabs tabs={tabs} />
				{!isShowingIndex && (
					<CourseNavigatorMobileFooter
						canGoBack={canGoBack}
						canGoForward={canGoForward}
						onGoBack={goToPreviousLesson}
						onGoForward={goToNextLesson}
						courseId={course.id}
						studentId={studentId}
					/>
				)}
			</div>
			<nav
				className={cn(
					'fixed inset-0 bottom-0 z-50 h-full overflow-scroll py-5 transition-all duration-300',
					isShowingIndex ? 'h-full bg-cyan-50' : 'hidden h-0',
				)}
			>
				<button onClick={openIndex} className="absolute right-5 top-5">
					<NextImage src={CloseIcon as string} alt="Cerrar" />
				</button>
				<div className="mt-16 p-5">
					<p className="text-xl font-bold text-gray-800">{course.name}</p>

					<div className="pt-3">
						<ul>
							{course.blocks.map((block, index) => {
								return (
									<li key={block.id} className="mt-4">
										<header className="mb-2 pl-5">
											<span className="text-sm font-medium">Bloque {index + 1}</span>
											<span className="text-sm"> - {block.name}</span>
										</header>

										{block.content && (
											<ul>
												{block.content.map((lesson, number) => {
													const isCurrentLesson =
														currentBlock === index && currentLesson === number;

													return (
														<NextLink
															href={`/escuela/mis-cursos/${slug as string}?block=${index}&lesson=${number}`}
															key={lesson.id}
															className={cn(
																'mt-1 flex items-center p-3 pl-5',
																isCurrentLesson && 'bg-[#D8DEDF]',
															)}
														>
															<div className="mr-2 flex items-center justify-center gap-2">
																{getLessonIcon(lesson)}

																<span className="font-bold text-gray-700">
																	{getLessonType(lesson)}
																	{lesson.blockName && ':'}
																</span>
															</div>

															<span className="ml-1 w-64 truncate">{lesson.blockName}</span>

															<div key={lesson.id} className="ml-auto pl-2">
																{watchedLessons.some((watched) => {
																	return block.id && watched.data?.[block.id]?.includes(lesson.id!);
																}) ? (
																	<NextImage
																		src={CheckedIcon as string}
																		alt="Visto"
																		onClick={(e) => {
																			e.preventDefault();
																			e.stopPropagation();
																			handleLessonViewedClick(true, lesson.id!);
																		}}
																		onMouseDown={(e) => {
																			e.preventDefault();
																			e.stopPropagation();
																		}}
																	/>
																) : (
																	<NextImage
																		src={UncheckedIcon as string}
																		alt="No visto"
																		onClick={(e) => {
																			e.preventDefault();
																			e.stopPropagation();
																			handleLessonViewedClick(false, lesson.id!);
																		}}
																		onMouseDown={(e) => {
																			e.preventDefault();
																			e.stopPropagation();
																		}}
																	/>
																)}
															</div>
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
