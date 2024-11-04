import type { CollectionConfig } from 'payload';

export const CourseComment: CollectionConfig = {
	slug: 'comment',
	labels: {
		singular: 'Comentario',
		plural: 'Comentarios',
	},
	admin: {
		description: 'Comentarios de un bloque de un Curso.',
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
			hasMany: true,
			admin: {
				description: 'El curso al que pertenece el comentario.',
			},
		},
		{
			name: 'block',
			label: 'Bloque del Curso',
			type: 'number',
			admin: {
				description: 'El bloque del curso al que pertenece el comentario.',
			},
		},
		{
			name: 'author',
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
