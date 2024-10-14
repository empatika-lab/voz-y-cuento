'use server';

import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

export default async function tryAddPendingPayment(studentId: number, courseId: number) {
	const payload = await getPayloadHMR({
		config: configPromise,
	});

	try {
		await payload.create({
			collection: 'pending',
			data: {
				course: courseId,
				student: studentId,
				isPaid: false,
			},
		});
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('[tryAddPendingPayment] Error adding pending payment', error);
	}
}
