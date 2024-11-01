import type { CollectionConfig } from 'payload';

export const CourseContentBlock: CollectionConfig['fields'][0] = {
	type: 'blocks',
	name: 'content',
	label: 'Bloque de Contenido',
	labels: { singular: 'Bloque', plural: 'Bloques' },
	admin: {
		description: 'Bloque de contenido del curso.',
	},
	blocks: [
		{
			slug: 'video',
			labels: { singular: 'Video', plural: 'Videos' },
			fields: [
				{
					name: 'link',
					label: 'Link',
					type: 'text',
					admin: { description: 'Link al video de Youtube' },
					required: true,
				},
				{
					name: 'description',
					label: 'Descripción',
					type: 'textarea',
					required: false,
					admin: { description: 'Un texto para acompañar el video' },
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
					required: true,
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
					required: true,
				},
			],
		},
	],
};

export type CourseContentBlock = typeof CourseContentBlock;
