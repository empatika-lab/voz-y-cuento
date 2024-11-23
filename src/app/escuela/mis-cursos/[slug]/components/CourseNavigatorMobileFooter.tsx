'use client';

import NextImage from 'next/image';

/* Assets */
import IndexIcon from '@images/icons/index.svg';
import ForwardIcon from '@images/icons/forward.svg';

/* Components */
import Button from '@/components/Button';

/* Utils */
import { cn } from '@/lib/utils/classNames';

interface CourseNavigatorMobileFooterProps {
	canGoBack: boolean;
	canGoForward: boolean;
	onGoBack: () => void;
	onGoForward: () => void;
}

export default function CourseNavigatorMobileFooter({
	canGoBack = true,
	canGoForward = true,
	onGoBack,
	onGoForward,
}: CourseNavigatorMobileFooterProps) {
	return (
		<footer className="container fixed bottom-0 left-0 right-0 flex flex-nowrap justify-between border-t border-black bg-cyan-50 py-[10px]">
			<Button className="flex min-w-4 max-w-fit flex-nowrap items-center justify-center gap-[6px] rounded-md border !bg-cyan-200 px-2 py-1 shadow-none">
				Índice <NextImage src={IndexIcon as string} alt="Índice" />
			</Button>
			<div className="flex gap-2">
				<button
					className={cn('appearance-none', !canGoBack && 'opacity-50')}
					disabled={!canGoBack}
					onClick={onGoBack}
				>
					<NextImage
						src={ForwardIcon as string}
						alt="Ir a la clase anterior"
						className="rotate-180"
					/>
				</button>
				<button
					className={cn('appearance-none', !canGoForward && 'opacity-50')}
					disabled={!canGoForward}
					aria-label="Ir a la clase siguiente"
					onClick={onGoForward}
				>
					<NextImage src={ForwardIcon as string} alt="Ir a la clase siguiente" />
				</button>
			</div>
		</footer>
	);
}
