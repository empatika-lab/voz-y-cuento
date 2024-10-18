'use server';

import configPromise from '@payload-config';
import sendgrid from '@sendgrid/mail';
import { getPayloadHMR } from '@payloadcms/next/utilities';

export default async function sendPaymentMethodsEmail(courseId: number, studentId: number) {
	const payload = await getPayloadHMR({
		config: configPromise,
	});

	sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

	const course = await payload.findByID({
		collection: 'courses',
		id: courseId,
	});

	const student = await payload.findByID({
		collection: 'students',
		id: studentId,
	});

	await sendgrid
		.send({
			dynamicTemplateData: {
				course_name: course.name,
			},
			from: 'vozycuento@gmail.com',
			subject: 'Métodos de pago',
			templateId: 'd-d9060a149956470c8f933018b868cf9a',
			to: student.email,
		})
		.catch((error) => {
			payload.logger.error(`[sendPaymentMethodsEmail]: ${error as string}`);
		});
}
