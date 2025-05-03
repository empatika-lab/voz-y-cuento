import { use, useCallback } from 'react';

/* Components */
import RichText from '@/components/RichText/RichText';
import YoutubeViewer from './YoutubeViewer';
import PDFViewer from '@/components/PdfViwer';

/* Context */
import { WatchedLessonContext } from '../context/WatchedLessonContext';

/* Utils */
import { markCourseLessonAsViewed } from '@/lib/utils/course';
import ClientOnly from '@/components/ClientOnly';
import { getBlockTypeName } from '@/lib/utils/blocks';

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
				<article className="px-5 pb-16 pt-5 lg:px-0">
					{lesson.blockName && <h2 className="mb-5 text-lg font-bold">{lesson.blockName}</h2>}
					<RichText content={lesson.content} enableGutter={false} />
				</article>
			</>
		);
	}

	if (lesson.blockType === 'exercise' && lesson.content) {
		return (
			<article className="px-5 pb-32 pt-5">
				{lesson.blockName && (
					<h2 className="mb-5 px-5 text-lg font-bold lg:px-0">{lesson.blockName}</h2>
				)}
				<RichText key={lesson.id} content={lesson.content} />
			</article>
		);
	}

	if (lesson.blockType === 'dossier' && lesson.content) {
		return (
			<article className="px-5 pb-32 pt-5">
				{lesson.blockType && (
					<h2 className="mb-5 text-lg font-bold lg:px-0">
						{getBlockTypeName(lesson.blockType as string)}
					</h2>
				)}
				<div>{lesson.content}</div>
				{lesson.file && lesson.file.mimeType === 'application/pdf' && (
					<div className="mt-10">
						<ClientOnly>
							<PDFViewer file={lesson.file.url} />
						</ClientOnly>
					</div>
				)}
			</article>
		);
	}

	if (lesson.blockType === 'additional-material' && lesson.material) {
		return (
			<article className="px-5 pb-32 pt-5 [&>a]:font-bold">
				<h2 className="mb-5 px-5 text-lg font-bold lg:px-0">{lesson.blockName}</h2>
				<RichText key={lesson.id} content={lesson.material} />
			</article>
		);
	}

	if (lesson.blockType === 'archive' && lesson.content) {
		return (
			<article className="pb-32 pt-5">
				<h2 className="mb-5 px-5 text-lg font-bold lg:px-0">
					{lesson.blockName ?? 'Prácticas de alumnos anteriores'}
				</h2>
				<p className="px-5 text-lg text-gray-600 lg:px-0">
					Archivo de videos de alumnos que han terminado esta clase.
				</p>
				<RichText key={lesson.id} content={lesson.content} />
			</article>
		);
	}
	return null;
}
