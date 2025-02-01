import type { CollectionConfig } from 'payload';

export const CourseContentBlock: CollectionConfig['fields'][0] = {
	type: 'blocks',
	name: 'content',
	label: 'Listado de Clases',
	labels: { singular: 'Clase', plural: 'Clases' },
	admin: {
		description: 'Agregar clases: videos, ejercicios y materiales adicionales.',
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
					name: 'content',
					label: 'Texto Adicional',
					type: 'richText',
					required: false,
					admin: { description: 'Un texto para acompañar el video' },
				},
			],
		},
		{
			slug: 'presentation',
			labels: { singular: 'Presentación', plural: 'Presentaciones' },
			fields: [
				{
					name: 'content',
					label: 'Texto Adicional',
					type: 'richText',
					required: false,
					admin: { description: 'Un texto para acompañar la presentación' },
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
		{
			slug: 'archive',
			labels: { singular: 'Video de Alumno', plural: 'Videos de Alumnos' },
			fields: [
				{
					name: 'content',
					label: 'Contenido',
					type: 'richText',
					required: true,
				},
			],
		},
	],
};

export type CourseContentBlock = typeof CourseContentBlock;
