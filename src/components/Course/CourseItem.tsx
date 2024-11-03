import YoutubeViewer from './YoutubeViewer';

interface CourseItemProps {
	block: {
		content?:
			| (
					| {
							link?: string | null;
							id?: string | null;
							blockName?: string | null;
							blockType: 'video';
					  }
					| {
							content?: {
								root: {
									type: string;
									children: {
										type: string;
										version: number;
										[k: string]: unknown;
									}[];
									direction: ('ltr' | 'rtl') | null;
									format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
									indent: number;
									version: number;
								};
								[k: string]: unknown;
							} | null;
							id?: string | null;
							blockName?: string | null;
							blockType: 'exercise';
					  }
					| {
							material?: {
								root: {
									type: string;
									children: {
										type: string;
										version: number;
										[k: string]: unknown;
									}[];
									direction: ('ltr' | 'rtl') | null;
									format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
									indent: number;
									version: number;
								};
								[k: string]: unknown;
							} | null;
							id?: string | null;
							blockName?: string | null;
							blockType: 'additional-material';
					  }
			  )[]
			| null;
		id?: string | null;
	};
}

export default function CourseItem({ block }: CourseItemProps) {
	if (Array.isArray(block.content)) {
		return block.content.map((item) => {
			if (item.blockType === 'video' && item.link) {
				return <YoutubeViewer key={item.id} youtubeUrl={item.link} />;
			}

			return null;
		});
	}

	return <div>{block.id}</div>;
}
