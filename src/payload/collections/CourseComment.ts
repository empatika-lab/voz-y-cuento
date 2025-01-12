import type { CollectionConfig } from 'payload';

export const CourseComment: CollectionConfig = {
	slug: 'comment',
	access: {
		read: () => true,
	},
	labels: {
		singular: 'Comentario',
		plural: 'Comentarios',
	},
	admin: {
		description: 'Comentarios de un lección dentro de un bloque de un Curso.',
	},
	fields: [
		{
			name: 'comment',
			label: 'Comentario',
			type: 'textarea',
		},
		{
			name: 'course',
			label: 'Curso',
			type: 'relationship',
			relationTo: 'courses',
			admin: {
				description: 'El curso al que pertenece el comentario.',
			},
		},
		{
			name: 'blockId',
			label: 'Bloque del Curso',
			required: true,
			type: 'text',
			admin: {
				description: 'El bloque del curso al que pertenece el comentario.',
			},
		},
		{
			name: 'lessonId',
			label: 'Lección del Curso',
			required: true,
			type: 'text',
			admin: {
				description: 'La lección del curso al que pertenece el comentario.',
			},
		},
		{
			name: 'author',
			label: 'Autor',
			admin: {
				description: 'El nombre del autor del comentario.',
			},
			type: 'text',
		},
		{
			name: 'highlighted',
			label: 'Resaltado',
			type: 'checkbox',
			admin: {
				description: 'Indica si el comentario es resaltado.',
			},
		},
		{
			name: 'responses',
			type: 'array',
			label: 'Respuestas',
			labels: {
				singular: 'Respuesta',
				plural: 'Respuestas',
			},
			fields: [
				{
					name: 'response',
					label: 'Respuesta',
					type: 'textarea',
				},
				{
					name: 'highlighted',
					label: 'Resaltado',
					type: 'checkbox',
					admin: {
						description: 'Indica si la respuesta al comentario es resaltada.',
					},
				},
				{
					name: 'author',
					label: 'Autor',
					type: 'text',
					admin: {
						description: 'El nombre del autor de la respuesta.',
					},
				},
			],
			admin: {
				description: 'Respuestas a este comentario.',
			},
		},
	],
};
