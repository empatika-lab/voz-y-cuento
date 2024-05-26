import path from 'path';
import dotenv from 'dotenv';

const env = process.env.NODE_ENV === 'development' ? 'local' : 'production';

dotenv.config({
	path: path.join(import.meta.dirname, `../../.env.${env}`),
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		reactCompiler: true,
		ppr: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
			},
			{
				protocol: 'https',
				hostname: 'localhost',
			},
			{
				protocol: 'https',
				hostname: 'api.voz-y-cuento.localhost',
			},
			{
				protocol: 'https',
				hostname: 'adminvozycuento.artrends.ar',
			},
		],
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
};

export default nextConfig;
