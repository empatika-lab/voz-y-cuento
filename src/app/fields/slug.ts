import type { Field } from 'payload';

import deepMerge from '../../payload/utils/deepMerge';
import formatSlug from '../../payload/utils/formatSlug';

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field;

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) =>
	deepMerge<Field, Partial<Field>>(
		{
			name: 'slug',
			type: 'text',
			admin: {
				position: 'sidebar',
			},
			hooks: {
				beforeValidate: [formatSlug(fieldToUse)],
			},
			index: true,
			label: 'Slug',
		},
		overrides,
	);
