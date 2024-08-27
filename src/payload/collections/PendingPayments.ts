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
	],
};
