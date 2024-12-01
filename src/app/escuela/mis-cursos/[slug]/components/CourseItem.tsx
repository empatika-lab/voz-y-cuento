/* Components */
import RichText from '@/components/RichText/RichText';
import YoutubeViewer from './YoutubeViewer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CourseItem({ lesson }: { lesson: any }) {
	if (lesson.blockType === 'video' && lesson.link) {
		return (
			<>
				<YoutubeViewer youtubeUrl={lesson.link} />
				<article className="pb-16 pt-5">
					<h2 className="mb-5 pl-5 text-lg font-bold">{lesson.blockName}</h2>
					<RichText content={lesson.content} enableGutter />
				</article>
			</>
		);
	}

	if (lesson.blockType === 'exercise' && lesson.content) {
		return (
			<article className="pb-32 pt-5">
				<h2 className="mb-5 pl-5 text-lg font-bold">{lesson.blockName}</h2>
				<RichText key={lesson.id} content={lesson.content} />
			</article>
		);
	}

	if (lesson.blockType === 'additional-material' && lesson.material) {
		return (
			<article className="pb-32 pt-5">
				<h2 className="mb-5 pl-5 text-lg font-bold">{lesson.blockName}</h2>
				<RichText key={lesson.id} content={lesson.material} />
			</article>
		);
	}

	return null;
}
