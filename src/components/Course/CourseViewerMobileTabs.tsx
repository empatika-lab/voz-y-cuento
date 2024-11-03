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
	}[];
}

export default function CourseViewerMobileTabs({ tabs }: CourseViewerMobileTabsProps) {
	const [currentTabIndex, setCurrentTabIndex] = useState(0);

	return (
		<>
			<nav className="flex w-full items-center justify-center gap-3 bg-cyan-100 pt-2">
				{tabs.map((tab, index) => (
					<button
						key={index}
						className={cn(
							'bg-cyan-10 rounded-t-xl border-l border-r-2 border-t border-grey-900 px-12 py-1 text-sm font-bold text-grey-900 text-opacity-50',
							currentTabIndex === index && 'text-primary bg-cyan-50 text-opacity-100',
						)}
						onClick={() => {
							setCurrentTabIndex(index);
						}}
					>
						{tab.label}
					</button>
				))}
			</nav>
			<article>{tabs[currentTabIndex].Component}</article>
		</>
	);
}
