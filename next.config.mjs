import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
	turbopack: {
		resolveAlias: {
			canvas: './empty-module.ts',
		},
	},
	logging: {
		fetches: { fullUrl: true },
	},
	images: {
		remotePatterns: [
			{ hostname: 'localhost', port: '3000' },
			{ hostname: 'voz-y-cuento.vercel.app' },
			{ hostname: 'voz-y-cuento-next.vercel.app' },
		],
	},
};

export default withPayload(nextConfig);
