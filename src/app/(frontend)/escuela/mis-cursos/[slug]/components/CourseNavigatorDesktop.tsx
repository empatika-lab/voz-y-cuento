'use client';

import { use, useEffect } from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useParams } from 'next/navigation';

/* Types */
import type { Course, Media } from '@/payload-types';

/* Components */
import Hero from '@/components/Layout/Hero';
import CourseItem from './CourseItem';
import CourseViewerDesktopTabs from './CourseViewerDesktopTabs';
import CourseLessonComments from './CouseLessonComments';
import { Accordion, AccordionItem } from '@/components/Accordion';

/* Utils */
import { cn } from '@/lib/utils/classNames';

/* Assets */
import VideoIcon from '@images/icons/video.svg';
import PencilIcon from '@images/icons/pencil.svg';
import BookIcon from '@images/icons/book.svg';
import CheckedIcon from '@images/icons/checked-circle.svg';
import UncheckedIcon from '@images/icons/unchecked-circle.svg';
import ChevronDownIcon from '@images/icons/chevron-down.svg';

/* Context */
import { WatchedLessonContext } from '../context/WatchedLessonContext';
import { useCourseTabsIndexContext } from '../context/CourseTabsIndexContext';

/* Utils */
import { markCourseLessonAsViewed, unmarkCourseLessonAsViewed } from '@/lib/utils/course';

interface CourseNavigatorDesktopProps {
	course: Course;
	currentBlock: number;
	currentLesson: number;
	totalBlocks: number;
	totalLessons: number;
	isShowingIndex: boolean;
	studentId: number;
	user: { id: string; email: string; name: string; courses: number[] };
}

export default function CourseNavigatorDesktop({
	course,
	currentBlock,
	currentLesson,
	studentId,
	user,
}: CourseNavigatorDesktopProps) {
	/* Hooks */
	const { slug } = useParams();

	/* Context */
	const { watchedLessons, fetchWatchedLessons } = use(WatchedLessonContext);
	const { currentTabIndex, setCurrentTabIndex } = useCourseTabsIndexContext();

	/* Effects */
	useEffect(() => {
		if (course.id && studentId) {
			void fetchWatchedLessons(studentId, course.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [course.id, studentId, currentBlock, currentLesson]);

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
	];

	const getLessonIcon = (lesson: { blockType: string }) => {
		if (lesson.blockType === 'exercise') {
			return <NextImage src={PencilIcon as string} alt="Ejercicio" width={16} height={16} />;
		}

		if (lesson.blockType === 'additional-material') {
			return <NextImage src={BookIcon as string} alt="Recurso" width={16} height={16} />;
		}

		return <NextImage src={VideoIcon as string} alt="Video" width={16} height={16} />;
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

		if (lesson.blockType === 'archive') {
			return 'Ejemplos';
		}

		return null;
	};

	const handleLessonViewedClick = (
		isViewed: boolean,
		studentId: number,
		blockId: string,
		lessonId: string,
	) => {
		if (isViewed) {
			unmarkCourseLessonAsViewed(course.id, studentId, blockId, lessonId)
				.then(() => {
					void fetchWatchedLessons(studentId, course.id);
				})
				.catch((error) => {
					// eslint-disable-next-line no-console
					console.error('Error unmarking lesson as viewed:', error);
				});
		} else {
			markCourseLessonAsViewed(course.id, studentId, blockId, lessonId)
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
		<div className="bg-cyan-50">
			<Hero className="hidden lg:block">
				<div className="container">
					<h1 className="relative font-display text-8xl font-normal text-white">
						Escuela de Narración
					</h1>
					<p className="relative mt-12 font-bold text-white">
						Aprende el arte de contar historias.
					</p>
				</div>
			</Hero>
			<div className="container mt-[200px] hidden h-full justify-between bg-cyan-50 lg:flex">
				<div>
					<div className="relative h-[259px] w-[259px]">
						<NextImage
							src={(course.image as Media).url!}
							alt={course.name}
							fill
							className="rounded-[20px] object-cover"
							priority
						/>
					</div>
					<Accordion className="mt-5">
						{course.blocks.map((block, index) => (
							<AccordionItem
								className="py-1"
								key={block.id}
								id={block.id!}
								header={
									<header className="mb-2 flex w-[260px] items-center justify-between gap-2 px-3 text-left">
										<div className="flex w-[90%] flex-1 flex-col items-start gap-1">
											<span className="text-base font-medium">Bloque {index + 1}</span>
											<span className="text-sm text-gray-600">{block.name}</span>
										</div>
										<NextImage
											src={ChevronDownIcon as string}
											alt="Arrow right"
											width={16}
											height={16}
										/>
									</header>
								}
								content={
									<ul className="max-w-[260px]">
										{block?.content?.map((lesson, number) => {
											const isCurrentLesson = currentBlock === index && currentLesson === number;

											return (
												<li key={lesson.id}>
													<NextLink
														href={`/escuela/mis-cursos/${slug as string}?block=${index}&lesson=${number}`}
														className={cn(
															'mt-1 flex flex-1 items-center p-3',
															isCurrentLesson && 'bg-[#D8DEDF]',
														)}
														onClick={() => {
															if (currentTabIndex > 0) {
																setCurrentTabIndex(0);
															}
														}}
													>
														<div className="flex-0 mr-2 flex items-center justify-between gap-2">
															{getLessonIcon(lesson)}

															<p className="flex-1 font-bold text-gray-700">
																{getLessonType(lesson)}
																{lesson.blockName && ':'}
															</p>
														</div>

														<span className="ml-3 w-64 truncate" title={lesson.blockName ?? ''}>
															{lesson.blockName}
														</span>

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
																		handleLessonViewedClick(true, studentId, block.id!, lesson.id!);
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
																		handleLessonViewedClick(
																			false,
																			studentId,
																			block.id!,
																			lesson.id!,
																		);
																	}}
																	onMouseDown={(e) => {
																		e.preventDefault();
																		e.stopPropagation();
																	}}
																/>
															)}
														</div>
													</NextLink>
												</li>
											);
										})}
									</ul>
								}
							/>
						))}
					</Accordion>
				</div>
				<div className="mx-auto max-w-[744px] flex-1">
					<header className="bg-cyan-100 pb-1 pt-3">
						<h1 className="container pl-[20px] text-xl font-bold text-gray-800">{course.name}</h1>
					</header>
					<div className="mx-auto flex flex-col items-center justify-center bg-cyan-100">
						<CourseViewerDesktopTabs tabs={tabs} />
					</div>
				</div>
			</div>
		</div>
	);
}
