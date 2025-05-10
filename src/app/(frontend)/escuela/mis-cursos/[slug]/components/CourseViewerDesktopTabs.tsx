'use client';

/* Types */
import { type ReactNode } from 'react';

/* Utils */
import { cn } from '@/lib/utils/classNames';

/* Context */
import { useCourseTabsIndexContext } from '../context/CourseTabsIndexContext';

interface CourseViewerDesktopTabsProps {
	tabs: {
		label: string;
		Component: ReactNode;
		isEnabled: boolean;
	}[];
}

export default function CourseViewerDesktopTabs({ tabs }: CourseViewerDesktopTabsProps) {
	const { currentTabIndex, setCurrentTabIndex } = useCourseTabsIndexContext();

	return (
		<>
			<nav className="container flex w-full items-center gap-3 border-b-[1px] border-grey-900 bg-cyan-100 pl-5 pt-2">
				{tabs.map((tab, index) => (
					<button
						key={index}
						style={{ width: `${100 / tabs.length}%` }}
						className={cn(
							'rounded-t-xl border-grey-900 bg-cyan-100 px-[10px] py-1 text-sm font-bold text-grey-900',
							currentTabIndex === index &&
								'text-primary -my-[1px] border-b border-l border-r-2 border-t border-b-cyan-50 border-t-grey-900 bg-cyan-50 text-opacity-100',
							{ 'pointer-events-none border-none bg-transparent text-opacity-50': !tab.isEnabled },
						)}
						onClick={() => {
							setCurrentTabIndex(index);
						}}
					>
						{tab.label}
					</button>
				))}
			</nav>
			<article className="w-full bg-cyan-50 pt-[20px] lg:pt-[40px]">
				{tabs[currentTabIndex].Component}
			</article>
		</>
	);
}
