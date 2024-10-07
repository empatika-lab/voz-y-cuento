/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { CollectionConfig } from 'payload';

export const PendingPayments: CollectionConfig = {
	slug: 'pending',
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
						const uniqueCourses = new Set(studentData.courses ?? []);
						// Add the new course only if it doesn't already exist
						uniqueCourses.add(originalDoc.course as number);

						await req.payload.update({
							collection: 'students',
							id: originalDoc.student,
							data: {
								courses: Array.from(uniqueCourses),
							},
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
