import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
	slug: 'media',
	labels: {
		singular: 'Archivo',
		plural: 'Archivos',
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'alt',
			admin: {
				description: 'Una descripción para el usuario por si la imágen falla en su carga.',
			},
			type: 'text',
			required: false,
		},
	],
	upload: {
		mimeTypes: ['image/*', 'application/pdf', 'application/vnd.ms-powerpoint', 'audio/mpeg'],
	},
};
