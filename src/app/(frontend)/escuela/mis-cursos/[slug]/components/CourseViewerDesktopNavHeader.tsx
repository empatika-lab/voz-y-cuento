import NextImage from 'next/image';
import { use } from 'react';

/* Assets */
import ChevronRight from '@images/icons/chevron-right.svg';
import CheckedIcon from '@images/icons/checked-circle.svg';
import UncheckedIcon from '@images/icons/unchecked-circle.svg';

/* Context */
import { WatchedLessonContext } from '../context/WatchedLessonContext';

/* Utils */
import { markCourseLessonAsViewed, unmarkCourseLessonAsViewed } from '@/lib/utils/course';

interface CourseViewerDesktopNavHeaderProps {
	canGoBack: boolean;
	canGoForward: boolean;
	onGoBack: () => void;
	onGoForward: () => void;
	courseId: number;
	studentId: number;
	blockId: string;
	lessonId: string;
	watchedLessons: { id: number; data: Record<string, string[]> }[];
}

export default function CourseViewerDesktopNavHeader({
	canGoBack,
	canGoForward,
	onGoBack,
	onGoForward,
	courseId,
	studentId,
	blockId,
	lessonId,
	watchedLessons,
}: CourseViewerDesktopNavHeaderProps) {
	const { fetchWatchedLessons } = use(WatchedLessonContext);

	const isLessonWatched = watchedLessons.some((watched) => {
		return blockId && watched.data?.[blockId]?.includes(lessonId);
	});

	const handleLessonViewedClick = () => {
		if (isLessonWatched) {
			unmarkCourseLessonAsViewed(courseId, studentId, blockId, lessonId)
				.then(() => {
					void fetchWatchedLessons(studentId, courseId);
				})
				.catch((error) => {
					// eslint-disable-next-line no-console
					console.error('Error unmarking lesson as viewed:', error);
				});
		} else {
			markCourseLessonAsViewed(courseId, studentId, blockId, lessonId)
				.then(() => {
					void fetchWatchedLessons(studentId, courseId);
				})
				.catch((error) => {
					// eslint-disable-next-line no-console
					console.error('Error marking lesson as viewed:', error);
				});
		}
	};

	return (
		<header className="container mb-10 hidden items-center justify-between border-b border-gray-900 pb-5 lg:flex">
			<nav className="flex items-center justify-center gap-[60px]">
				<button
					disabled={!canGoBack}
					onClick={onGoBack}
					className="flex min-w-[0px] gap-2 px-0 font-medium hover:bg-transparent hover:font-medium hover:shadow-none active:bg-transparent active:shadow-none disabled:opacity-50"
				>
					<NextImage
						src={ChevronRight as string}
						alt="Regresar a la página inicial"
						className="h-auto w-4 rotate-180"
					/>
					<span className="text-sm">Anterior</span>
				</button>
				<button
					disabled={!canGoForward}
					onClick={onGoForward}
					className="flex gap-2 font-medium hover:bg-transparent hover:shadow-none active:bg-transparent active:shadow-none disabled:opacity-50 lg:min-w-fit"
				>
					<span className="text-sm">Siguiente</span>
					<NextImage
						src={ChevronRight as string}
						alt="Regresar a la página inicial"
						className="h-auto w-4"
					/>
				</button>
			</nav>

			<button className="flex items-center gap-2" onClick={handleLessonViewedClick}>
				<p>{isLessonWatched ? 'Marcar como no visto' : 'Marcar como visto'}</p>
				<NextImage
					src={isLessonWatched ? (CheckedIcon as string) : (UncheckedIcon as string)}
					alt={isLessonWatched ? 'Visto' : 'No visto'}
				/>
			</button>
		</header>
	);
}
