import type { CollectionConfig } from 'payload';

export const Student: CollectionConfig = {
	slug: 'students',
	admin: {
		useAsTitle: 'email',
		description: 'Estos son las personas registradas en la aplicación.',
	},

	labels: {
		singular: 'Alumno',
		plural: 'Alumnos',
	},
	auth: true,
	fields: [
		// Email added by default
		// Add more fields as needed
	],
};
