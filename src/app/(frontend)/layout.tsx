/* Types */
import type { Metadata, Viewport } from 'next';

/* STYLES */
import '@lib/styles/global.css';

/* FONTS */
import localFont from 'next/font/local';
import { Raleway } from 'next/font/google';

/* Contexts */
import ProgressBarProvider from '@/providers/ProgressBarProvider';

const raleway = Raleway({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'],
	variable: '--font-sans',
});

const stickyPops = localFont({
	src: '../../../public/fonts/StickyPops.otf',
	display: 'swap',
	variable: '--font-display',
});

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
};

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_WEB_URL ?? ''),
	title: 'Voz y Cuento | El arte al narrar',
	description:
		'Plataforma para el aprendizaje del arte de narraración con cursos gratuitos y premiums por Emilce Brusa, narradora profesional.',
	keywords:
		'Narración oral, cuentos, Emilce Brusa, curso de narración, storytelling, narración profesional, cursos de narración, cuentacuentos',
	authors: [{ name: 'Emilce Brusa' }],
	creator: 'Emilce Brusa',
	publisher: 'Voz y Cuento',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_WEB_URL}/images/emilce-lg.png`,
				width: 1200,
				height: 630,
				alt: 'Voz y Cuento | El arte al narrar',
			},
		],
		type: 'website',
		locale: 'es_AR',
		siteName: 'Voz y Cuento',
		title: 'Voz y Cuento | El arte al narrar',
		description:
			'Plataforma para el aprendizaje del arte de narraración con cursos gratuitos y premiums por Emilce Brusa, narradora profesional.',
		url: process.env.NEXT_PUBLIC_WEB_URL,
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Voz y Cuento | El arte al narrar',
		description:
			'Plataforma para el aprendizaje del arte de narraración con cursos gratuitos y premiums por Emilce Brusa, narradora profesional.',
		images: [`${process.env.NEXT_PUBLIC_WEB_URL}/images/emilce-lg.png`],
		creator: '@vozycuento',
		site: '@vozycuento',
	},
	alternates: {
		canonical: '/',
	},
	verification: {
		google: 'add-your-google-site-verification-here',
	},
	category: 'education',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className="h-full" lang="en">
			<body
				className={`${raleway.variable} ${stickyPops.variable} h-full bg-cyan-50 font-sans antialiased`}
			>
				<ProgressBarProvider>{children}</ProgressBarProvider>
			</body>
		</html>
	);
}
