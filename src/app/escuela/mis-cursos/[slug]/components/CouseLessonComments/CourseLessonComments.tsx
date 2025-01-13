'use client';

import { useEffect, useState } from 'react';
import { stringify } from 'qs-esm';

/* Components */
import CourseLessonCommentsMobile from './CourseLessonCommentsMobile';

/* Types */
import type { Where } from 'payload';
import type { Comment } from '@/payload-types';

interface CourseLessonCommentsProps {
	courseId: string;
	blockId: string;
	lessonId: string;
	author: string;
}

export default function CourseLessonComments({
	courseId,
	blockId,
	author,
	lessonId,
}: CourseLessonCommentsProps) {
	const [comments, setComments] = useState<Comment[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchComments = async (
		courseId: number,
		blockId: string,
		lessonId: string,
	): Promise<void> => {
		const queryObject: Where = {
			and: [
				{
					course: {
						equals: courseId,
					},
				},
				{
					blockId: {
						equals: blockId,
					},
				},
				{
					lessonId: {
						equals: lessonId,
					},
				},
			],
		};

		const stringifiedQuery = stringify({ where: queryObject }, { addQueryPrefix: true });
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/comment${stringifiedQuery}`,
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			},
		);
		const data = (await response.json()) as { docs: Comment[] };

		setComments(data.docs);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchComments(Number(courseId), blockId, lessonId).catch((error) => {
			// eslint-disable-next-line no-console
			console.error(error);
			setIsLoading(false);
		});
	}, [blockId, courseId, lessonId]);

	return (
		<>
			<CourseLessonCommentsMobile
				courseId={courseId}
				blockId={blockId}
				lessonId={lessonId}
				comments={comments}
				author={author}
				isLoading={isLoading}
				refetchComments={fetchComments}
			/>
		</>
	);
}
