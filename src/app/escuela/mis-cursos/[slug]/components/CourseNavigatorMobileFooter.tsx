'use client';

import { useRouter } from 'next/navigation';
import NextImage from 'next/image';
import { use, useEffect } from 'react';

/* Assets */
import IndexIcon from '@images/icons/index.svg';
import ForwardIcon from '@images/icons/forward.svg';

/* Components */
import Button from '@/components/Button';

/* Utils */
import { WatchedLessonContext } from '../context/WatchedLessonContext';
import { cn } from '@/lib/utils/classNames';

interface CourseNavigatorMobileFooterProps {
	canGoBack: boolean;
	canGoForward: boolean;
	onGoBack: () => void;
	onGoForward: () => void;
	courseId: number;
	studentId: number;
}

export default function CourseNavigatorMobileFooter({
	canGoBack = true,
	canGoForward = true,
	onGoBack,
	onGoForward,
	courseId,
	studentId,
}: CourseNavigatorMobileFooterProps) {
	/* Context */
	const { fetchWatchedLessons } = use(WatchedLessonContext);

	/* Hooks */
	const router = useRouter();

	/* Effects */
	useEffect(() => {
		void fetchWatchedLessons(studentId, courseId);
	}, [courseId, studentId, fetchWatchedLessons]);

	return (
		<footer className="fixed bottom-0 left-0 right-0 border-t border-black bg-cyan-50 py-[10px]">
			<div className="container flex flex-nowrap justify-between">
				<Button
					className="flex min-w-4 max-w-fit flex-nowrap items-center justify-center gap-[6px] rounded-md border !bg-cyan-200 px-2 py-1 shadow-none"
					onClick={() => {
						// Add search params to current url
						const currentUrl = new URL(window.location.href);
						currentUrl.searchParams.set('index', 'true');
						router.push(currentUrl.toString());
					}}
				>
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
			</div>
		</footer>
	);
}
