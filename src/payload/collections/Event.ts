import type { CollectionConfig } from 'payload';

export const Event: CollectionConfig = {
	slug: 'events',
	labels: {
		singular: 'Evento',
		plural: 'Eventos',
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
				{ label: 'Familiar', value: 'Familiar' },
				{ label: 'Maternal', value: 'Maternal' },
				{ label: 'Infantil', value: 'Infantil' },
				{ label: 'Institución Educativa', value: 'Institucion' },
			],
			defaultValue: 'Familiar',
		},
		{
			type: 'select',
			name: 'level',
			label: 'Nivel',
			required: true,
			options: [
				{ label: 'Inicial', value: 'Inicial' },
				{ label: 'Primario', value: 'Primario' },
				{ label: 'Secundario', value: 'Secundario' },
			],
			// Only show if Category is equal to "Institución Educativa"
			admin: {
				condition: (_data, siblingData) => siblingData.category === 'Institucion',
			},
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
