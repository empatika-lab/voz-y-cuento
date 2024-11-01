import type { CollectionConfig } from 'payload';

export const Event: CollectionConfig = {
	slug: 'events',
	labels: {
		singular: 'Espectáculo',
		plural: 'Espectáculos',
	},
	admin: {
		useAsTitle: 'title',
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			type: 'text',
			name: 'title',
			label: 'Título',
			unique: true,
			required: true,
			admin: {
				description: 'El nombre del Evento para contratar.',
				width: '100%',
			},
		},
		{
			type: 'textarea',
			name: 'description',
			label: 'Descripción',
			required: true,
			maxLength: 220,
			admin: {
				description:
					'De qué trata el evento. Se ve en la tarjeta del evento en la página de Espectáculos.',
				width: '100%',
			},
		},
		{
			type: 'select',
			name: 'category',
			label: 'Categoría',
			required: true,
			options: [
				{ label: 'Maternal', value: 'Maternal' },
				{ label: 'Infantil', value: 'Infantil' },
				{ label: 'Familiar', value: 'Familiar' },
				{ label: 'Adultos', value: 'Adultos' },
				{ label: 'Personalizado', value: 'Personalizado' },
			],
			defaultValue: 'Familiar',
		},
		{
			name: 'image',
			label: 'Imágen de Portada',
			admin: {
				description: 'Esta imágen se muestra en la tarjeta del Evento.',
				style: {
					marginTop: '4rem',
				},
			},
			type: 'upload',
			relationTo: 'media',
			required: true,
		},
	],
};
