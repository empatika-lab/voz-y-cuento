/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { CollectionConfig } from 'payload';
import sendgrid, { type ClientResponse } from '@sendgrid/mail';

/* Types */
import type { Course } from '@/payload-types';
import EMAIL_TEMPLATES from '@/lib/utils/emailTemplates';

export const PendingPayments: CollectionConfig = {
	slug: 'pending',
	admin: {
		useAsTitle: 'student',
	},
	labels: {
		singular: 'Pago Pendiente',
		plural: 'Pagos Pendientes',
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			hasMany: false,
			index: true,
			label: 'Curso',
			name: 'course',
			relationTo: 'courses',
			required: true,
			type: 'relationship',
		},
		{
			hasMany: false,
			index: true,
			label: 'Alumno',
			name: 'student',
			relationTo: 'students',
			required: true,
			type: 'relationship',
		},
		{
			label: 'Pago Acreditado',
			name: 'isPaid',
			type: 'checkbox',
			defaultValue: false,
			required: true,
		},
	],
	hooks: {
		afterChange: [
			async ({ operation, doc, req }) => {
				try {
					if (operation === 'create' && doc.isPaid === false) {
						sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);
						const studentData = await req.payload.findByID({
							collection: 'students',
							id: doc.student.id as string,
						});
						const courseData = await req.payload.findByID({
							collection: 'courses',
							id: doc.course.id as string,
						});

						// Send email to admin about a new student on a course
						const sengridResponse = await sendgrid.send({
							dynamicTemplateData: {
								student_name: studentData.name,
								student_email: studentData.email,
								course_name: courseData.name,
							},
							from: 'vozycuento@gmail.com',
							subject: 'Voz y Cuento - Nuevo Estudiante',
							templateId: EMAIL_TEMPLATES.newStudentAlert,
							to: process.env.ADMIN_EMAIL,
						});

						// Send payment methods email to student
						await sendgrid
							.send({
								from: 'vozycuento@gmail.com',
								templateId: EMAIL_TEMPLATES.paymentMethods,
								dynamicTemplateData: {
									user_name: studentData.name,
									course_name: courseData.name,
								},
								to: studentData.email,
							})
							.catch((error) => {
								// eslint-disable-next-line no-console
								console.error(
									'[PendingPayments][afterChange] Error sending payment methods email:',
									error,
								);
							});

						if (
							sengridResponse.at(0) &&
							(sengridResponse.at(0) as ClientResponse).statusCode !== 202
						) {
							// eslint-disable-next-line no-console
							console.error('[PendingPayments][afterChange]', sengridResponse.at(0));
						}
					}
				} catch (error) {
					// eslint-disable-next-line no-console
					console.log('[PendingPayments][afterChange]', error);
				}
			},
		],
		beforeChange: [
			async ({ operation, data, originalDoc, req }) => {
				try {
					if (operation === 'update' && originalDoc.isPaid === false && data.isPaid === true) {
						const studentData = await req.payload.findByID({
							collection: 'students',
							id: originalDoc.student,
						});

						if (!studentData) {
							throw new Error('[beforeChange] No student data.');
						}

						// Create a Set from existing courses to remove duplicates
						const uniqueCourses = new Set(
							studentData?.courses?.map((course) => (course as Course).id) ?? [],
						);

						// Add the new course only if it doesn't already exist
						uniqueCourses.add(originalDoc.course as number);

						await req.payload.update({
							collection: 'students',
							id: originalDoc.student,
							data: {
								courses: Array.from(uniqueCourses),
							},
						});

						const courseData = await req.payload.findByID({
							collection: 'courses',
							id: originalDoc.course,
						});

						// Send email notification to user with course unlocked notification
						sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);
						await sendgrid
							.send({
								from: 'vozycuento@gmail.com',
								templateId: EMAIL_TEMPLATES.courseUnlocked,
								dynamicTemplateData: {
									user_name: studentData.name,
									course_name: courseData.name,
									course_url: `${process.env.NEXT_PUBLIC_WEB_URL}/escuela/mis-cursos/${courseData.slug}`,
								},
								to: studentData.email,
							})
							.catch((error) => {
								// eslint-disable-next-line no-console
								console.log('[PendingPayments][beforeChange]', error);
							});
					}
				} catch (error) {
					// eslint-disable-next-line no-console
					console.log('[PendingPayments][beforeChange]', error);
				}
			},
		],
	},
};
