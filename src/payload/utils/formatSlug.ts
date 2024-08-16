import type { FieldHook } from 'payload';

const format = (val: string): string =>
	val
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '')
		.toLowerCase();

const formatSlug =
	(fallback: string): FieldHook =>
	({ data, operation, originalDoc, value }) => {
		if (typeof value === 'string') {
			return format(value);
		}

		if (operation === 'create') {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const fallbackData = data?.[fallback] || originalDoc?.[fallback];

			if (fallbackData && typeof fallbackData === 'string') {
				return format(fallbackData);
			}
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return value;
	};

export default formatSlug;
