import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
	logging: {
		fetches: { fullUrl: true },
	},
	experimental: {
		ppr: true,
	},
};

export default withPayload(nextConfig);
