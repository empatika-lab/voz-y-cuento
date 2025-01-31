import { use, useCallback } from 'react';

/* Components */
import RichText from '@/components/RichText/RichText';
import YoutubeViewer from './YoutubeViewer';

/* Context */
import { WatchedLessonContext } from '../context/WatchedLessonContext';

/* Utils */
import { markCourseLessonAsViewed } from '@/lib/utils/course';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CourseItem({
	lesson,
	blockId,
	studentId,
	courseId,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	lesson: any;
	blockId: string;
	studentId: number;
	courseId: number;
}) {
	const { fetchWatchedLessons } = use(WatchedLessonContext);

	const handleLessonView = useCallback(
		async (lessonId: string) => {
			await markCourseLessonAsViewed(courseId, studentId, blockId, lessonId);
			await fetchWatchedLessons(studentId, courseId);
		},
		[courseId, studentId, blockId, fetchWatchedLessons],
	);

	if (lesson.blockType === 'video' && lesson.link) {
		return (
			<>
				<YoutubeViewer
					youtubeUrl={lesson.link}
					markCourseLessonAsViewed={handleLessonView}
					lessonId={lesson.id}
				/>
				<article className="pb-16 pt-5">
					{lesson.blockName && <h2 className="mb-5 px-5 text-lg font-bold">{lesson.blockName}</h2>}
					<RichText content={lesson.content} enableGutter />
				</article>
			</>
		);
	}

	if (lesson.blockType === 'exercise' && lesson.content) {
		return (
			<article className="pb-32 pt-5">
				{lesson.blockName && <h2 className="mb-5 px-5 text-lg font-bold">{lesson.blockName}</h2>}
				<RichText key={lesson.id} content={lesson.content} />
			</article>
		);
	}

	if (lesson.blockType === 'additional-material' && lesson.material) {
		return (
			<article className="pb-32 pt-5">
				<h2 className="mb-5 px-5 text-lg font-bold">{lesson.blockName}</h2>
				<RichText key={lesson.id} content={lesson.material} />
			</article>
		);
	}

	return null;
}
