import configPromise from '@payload-config';
import { buildCachedPayload } from '@payload-enchants/cached-local-api';
import { getPayloadHMR } from '@payloadcms/next/utilities';
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

export async function getLocalApi() {
	const payload = await getPayloadHMR({
		config: configPromise,
	});

	const cachedPayload = getCachedPayload(payload);

	return cachedPayload;
}
