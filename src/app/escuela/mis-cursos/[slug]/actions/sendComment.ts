'use server';

import 'server-only';

import configPromise from '@payload-config';
import { getPayload } from 'payload';

export async function sendComment(
	comment: string,
	courseId: string,
	blockId: string,
	lessonId: string,
	author: string,
	highlighted: boolean,
) {
	const payload = await getPayload({
		config: configPromise,
	});

	const newComment = await payload
		.create({
			collection: 'comment',
			data: {
				course: parseInt(courseId),
				blockId,
				lessonId,
				highlighted,
				comment,
				author: author ?? '',
			},
		})
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.error('Error sending comment', error);
		});

	return newComment;
}
