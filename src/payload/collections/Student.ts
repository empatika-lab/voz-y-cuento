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
	auth: {
		maxLoginAttempts: 15,
		tokenExpiration: 60 * 60 * 24 * 15, // 15 days
	},
	fields: [
		// Email added by default
		// Add more fields as needed

		{
			name: 'name',
			type: 'text',
			label: 'Nombre y Apellido',
			saveToJWT: true,
		},
		{
			label: 'Whatsapp',
			name: 'whatsapp',
			type: 'text',
			admin: {
				description: 'Número de Whatsapp para contactar.',
			},
		},
		{
			type: 'relationship',
			relationTo: 'courses',
			name: 'courses',
			hasMany: true,
			label: 'Cursos',
			admin: {
				description: 'Cursos a los que el alumno pertenece.',
			},
		},
	],
};
