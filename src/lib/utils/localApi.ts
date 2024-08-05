import { buildCachedPayload } from '@payload-enchants/cached-local-api';
import { revalidateTag, unstable_cache } from 'next/cache';

export const { cachedPayloadPlugin, getCachedPayload } = buildCachedPayload({
	collections: [
		{
			findOneFields: ['slug'],
			slug: 'courses',
		},
	],
	loggerDebug: true,
	// globals: [{ slug: 'header' }],
	revalidateTag,
	options: {},
	unstable_cache,
});
