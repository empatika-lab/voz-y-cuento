'use client';

/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, useState, type ReactNode } from 'react';

export const CourseTabsIndexContext = createContext({
	currentTabIndex: 0,
	setCurrentTabIndex: (_index: number) => {},
});

export const CourseTabsIndexProvider = ({ children }: { children: ReactNode }) => {
	const [currentTabIndex, setCurrentTabIndex] = useState(0);

	return (
		<CourseTabsIndexContext.Provider value={{ currentTabIndex, setCurrentTabIndex }}>
			{children}
		</CourseTabsIndexContext.Provider>
	);
};

export const useCourseTabsIndexContext = () => {
	const context = useContext(CourseTabsIndexContext);

	if (!context) {
		throw new Error('useCourseTabsIndexContext must be used within a CourseTabsIndexProvider');
	}

	return context;
};
