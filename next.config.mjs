import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
	logging: {
		fetches: { fullUrl: true },
	},
	experimental: {
		ppr: true,
	},
	images: {
		remotePatterns: [
			{ hostname: 'localhost', port: '3000' },
			{ hostname: 'voz-y-cuento.vercel.app' },
		],
	},
};

export default withPayload(nextConfig);
