import { buildCachedPayload } from '@payload-enchants/cached-local-api';
import { revalidateTag, unstable_cache } from 'next/cache';

export const { cachedPayloadPlugin, getCachedPayload } = buildCachedPayload({
	collections: [
		{
			findOneFields: ['id', 'slug'],
			slug: 'courses',
		},
		{
			findOneFields: ['id', 'slug'],
			slug: 'events',
		},
	],
	loggerDebug: true,
	// globals: [{ slug: 'header' }],
	revalidateTag,
	options: {},
	unstable_cache,
});
