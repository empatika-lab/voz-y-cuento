import React from 'react';

/* Utils */
import { cn } from '@/lib/utils/classNames';
import { SerializeLexical, type NodeTypes } from './utils';

interface Props {
	className?: string;
	content: {
		root: {
			children: unknown[];
		};
	};
	enableGutter?: boolean;
	enableProse?: boolean;
}

const RichText: React.FC<Props> = ({
	className,
	content,
	enableGutter = true,
	enableProse = true,
}) => {
	if (!content) {
		return null;
	}

	return (
		<div
			className={cn(
				{
					container: enableGutter,
					'rich-text': true,
					'max-w-none': !enableGutter,
					'prose dark:prose-invert mx-auto': enableProse,
				},
				className,
			)}
		>
			{content &&
				!Array.isArray(content) &&
				typeof content === 'object' &&
				'root' in content &&
				SerializeLexical({ nodes: content.root.children as NodeTypes[] })}
		</div>
	);
};

export default RichText;
