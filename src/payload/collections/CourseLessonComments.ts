import type { CollectionConfig } from 'payload';

export const CourseLessonComments: CollectionConfig = {
	slug: 'course-lesson-comments',
	access: {
		read: () => true,
	},
	labels: {
		plural: 'Comentarios de lecciones',
		singular: 'Comentario de lección',
	},
	admin: {
		useAsTitle: 'course',
		hidden: true,
	},
	fields: [
		{
			name: 'course',
			type: 'relationship',
			relationTo: 'courses',
			hasMany: false,
		},
		{
			name: 'student',
			type: 'relationship',
			relationTo: 'students',
			hasMany: false,
		},
		{
			name: 'comments',
			type: 'json',
			jsonSchema: {
				uri: 'a://b/foo.json',
				fileMatch: ['a://b/foo.json'],
				schema: {
					type: 'object',
					patternProperties: {
						'^[a-zA-Z0-9]+$': {
							type: 'object',
							patternProperties: {
								'^[a-zA-Z0-9]+$': {
									type: 'array',
									items: {
										type: 'object',
										properties: {
											comment: { type: 'string' },
											author: { type: 'string' },
											isHighlighted: { type: 'boolean' },
											replies: {
												type: 'array',
												items: {
													type: 'object',
													properties: {
														comment: { type: 'string' },
														author: { type: 'string' },
														isHighlighted: { type: 'boolean' },
													},
													required: ['comment', 'author', 'isHighlighted'],
												},
											},
										},
										required: ['comment', 'author', 'isHighlighted', 'replies'],
									},
								},
							},
							additionalProperties: false,
						},
					},
					additionalProperties: false,
				},
			},
		},
	],
};
