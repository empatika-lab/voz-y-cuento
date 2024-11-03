'use server';

import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

export default async function tryAddPendingPayment(studentId: number, courseId: number) {
	const payload = await getPayloadHMR({
		config: configPromise,
	});

	try {
		const pendingPayment = await payload.find({
			collection: 'pending',
			limit: 1,
			where: {
				student: {
					equals: studentId,
				},
				course: {
					equals: courseId,
				},
			},
		});

		if (pendingPayment.totalDocs > 0) {
			return true;
		}

		await payload.create({
			collection: 'pending',
			data: {
				course: courseId,
				student: studentId,
				isPaid: false,
			},
		});

		return true;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('[tryAddPendingPayment] Error adding pending payment', error);
		return false;
	}
}
