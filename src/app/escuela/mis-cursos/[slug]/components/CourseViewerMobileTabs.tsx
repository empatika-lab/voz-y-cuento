'use client';

import { useState } from 'react';

/* Types */
import { type ReactNode } from 'react';

/* Utils */
import { cn } from '@/lib/utils/classNames';

interface CourseViewerMobileTabsProps {
	tabs: {
		label: string;
		Component: ReactNode;
		isEnabled: boolean;
	}[];
}

export default function CourseViewerMobileTabs({ tabs }: CourseViewerMobileTabsProps) {
	const [currentTabIndex, setCurrentTabIndex] = useState(0);

	return (
		<>
			<nav className="flex w-full items-center gap-3 bg-cyan-100 pl-5 pt-2">
				{tabs.map((tab, index) => (
					<button
						key={index}
						className={cn(
							'w-[108px] rounded-t-xl border-grey-900 bg-cyan-100 px-[10px] py-1 text-sm font-bold text-grey-900',
							currentTabIndex === index &&
								'text-primary border-l border-r-2 border-t bg-cyan-25 text-opacity-100',
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
			<article className="w-full bg-cyan-25 pt-[20px]">{tabs[currentTabIndex].Component}</article>
		</>
	);
}