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

		{
			name: 'name',
			type: 'text',
			label: 'Nombre y Apellido',
		},
		{
			label: 'Whatsapp',
			name: 'whatsapp',
			type: 'text',
			admin: {
				description: 'Número de Whatsapp para contactar.',
			},
		},
	],
};
