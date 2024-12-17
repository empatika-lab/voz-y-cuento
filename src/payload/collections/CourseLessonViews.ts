import type { CollectionConfig } from 'payload';

export const CourseLessonViews: CollectionConfig = {
	slug: 'course-lesson-views',
	labels: {
		plural: 'Vistas de lecciones',
		singular: 'Vista de lección',
	},
	admin: {
		useAsTitle: 'course',
		// hidden: true,
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
						'^[0-9]+$': {
							type: 'array',
							items: {
								type: 'string',
							},
							minItems: 1,
						},
					},
					additionalProperties: false,
				},
			},
		},
	],
};
