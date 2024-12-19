import type { CollectionConfig } from 'payload';

export const CourseLessonViews: CollectionConfig = {
	slug: 'course-lesson-views',
	access: {
		read: () => true,
	},
	labels: {
		plural: 'Vistas de lecciones',
		singular: 'Vista de lección',
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
			name: 'data',
			type: 'json',
			jsonSchema: {
				uri: 'a://b/foo.json',
				fileMatch: ['a://b/foo.json'],
				schema: {
					type: 'object',
					patternProperties: {
						'^[a-zA-Z0-9]+$': {
							type: 'array',
							items: {
								type: 'string',
							},
						},
					},
					additionalProperties: false,
				},
			},
		},
	],
};
