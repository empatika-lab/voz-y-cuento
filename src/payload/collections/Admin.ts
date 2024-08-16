import type { CollectionConfig } from 'payload';

export const Admin: CollectionConfig = {
	slug: 'admins',
	admin: {
		useAsTitle: 'email',
		description:
			'Los usuarios con permisos para administrar el contenido del sitio web y la Escuela.',
	},
	labels: {
		singular: 'Administador',
		plural: 'Administadores',
	},
	auth: true,
	fields: [
		// Email added by default
		// Add more fields as needed
	],
};
