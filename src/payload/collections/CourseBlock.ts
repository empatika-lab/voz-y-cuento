import type { CollectionConfig } from 'payload';

export const CourseContentBlock: CollectionConfig['fields'][0] = {
	type: 'blocks',
	name: 'content',
	label: 'Bloques de Contenido',
	labels: { singular: 'Bloque', plural: 'Bloques' },
	admin: {
		description: 'Bloques de contenido del curso.',
	},
	blocks: [
		{
			slug: 'video',
			labels: { singular: 'Video', plural: 'Videos' },
			fields: [
				{
					name: 'Link',
					label: 'URL',
					type: 'text',
					admin: { description: 'Link al video de Youtube' },
				},
			],
		},
		{
			slug: 'exercise',
			labels: { singular: 'Ejercicio', plural: 'Ejercicios' },
			fields: [
				{
					name: 'content',
					label: 'Contenido',
					type: 'richText',
				},
			],
		},
		{
			slug: 'additional-material',
			labels: { singular: 'Recurso Adicional', plural: 'Recursos Adicionales' },
			fields: [
				{
					name: 'material',
					label: 'Material',
					type: 'richText',
				},
			],
		},
	],
};
