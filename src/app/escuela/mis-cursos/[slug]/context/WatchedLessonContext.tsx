'use client';
import { createContext, useCallback, useState } from 'react';
import { stringify } from 'qs-esm';

/* Types */
import type { Where } from 'payload';

/* Collections */
import { Admin } from '@/payload/collections/Admin';

interface WatchedLessonContextType {
	watchedLessons: { id: number; data: Record<string, string[]> }[];
	fetchWatchedLessons: (studentId: number, courseId: number) => Promise<void>;
}

export const WatchedLessonContext = createContext<WatchedLessonContextType>({
	watchedLessons: [],
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	fetchWatchedLessons: async (_studentId: number, _courseId: number) => {},
});

export const WatchedLessonProvider = ({ children }: { children: React.ReactNode }) => {
	const [watchedLessons, setWatchedLessons] = useState<
		{ id: number; data: Record<string, string[]> }[]
	>([]);

	const fetchWatchedLessons = useCallback(
		async (studentId: number, courseId: number): Promise<void> => {
			try {
				const select = {
					data: true,
				};

				const query: Where = {
					student: { equals: Number(studentId) },
					course: { equals: Number(courseId) },
				};
				const stringifiedQuery = stringify({ where: query, select }, { addQueryPrefix: true });
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/course-lesson-views${stringifiedQuery}`,
					{
						headers: {
							Authorization: `${Admin.slug} API-Key ${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}`,
						},
					},
				);
				const data = (await response.json()) as {
					docs: { id: number; data: Record<string, string[]> }[];
				};

				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				setWatchedLessons(data.docs);
			} catch (err) {
				// eslint-disable-next-line no-console
				console.error(err);
			}
		},
		[],
	);

	return (
		<WatchedLessonContext.Provider value={{ watchedLessons, fetchWatchedLessons }}>
			{children}
		</WatchedLessonContext.Provider>
	);
};
