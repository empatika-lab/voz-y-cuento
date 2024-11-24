import RichText from '@/components/RichText/RichText';
import YoutubeViewer from './YoutubeViewer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CourseItem({ lesson }: { lesson: any }) {
	if (lesson.blockType === 'video' && lesson.link) {
		return (
			<>
				<YoutubeViewer youtubeUrl={lesson.link} />
				<article className="py-5">
					<h2 className="mb-5 pl-5 text-lg font-bold">{lesson.blockName}</h2>
					<RichText content={lesson.content} enableGutter />
				</article>
			</>
		);
	}

	if (lesson.blockType === 'exercise' && lesson.content) {
		return <RichText key={lesson.id} content={lesson.content} />;
	}

	if (lesson.blockType === 'additional-material' && lesson.material) {
		return <RichText key={lesson.id} content={lesson.material} />;
	}

	return null;
}
