import type { CollectionConfig } from 'payload';

export const CourseLessonViews: CollectionConfig = {
	slug: 'course-lesson-views',
	admin: {
		useAsTitle: 'course',
		// hidden: true,
	},
	fields: [
		{
			name: 'course',
			type: 'relationship',
			relationTo: 'courses',
			hasMany: true,
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
								type: 'integer',
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
