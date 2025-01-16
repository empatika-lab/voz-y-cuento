import type { Metadata } from 'next';

/* Styles */
import '@lib/styles/global.css';

/* Fonts */
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
	src: '../../public/fonts/StickyPops.otf',
	display: 'swap',
	variable: '--font-display',
});

export const metadata: Metadata = {
	title: 'Voz y Cuento | El arte al narrar',
	description:
		'Plataforma para el aprendizaje del arte de narraración con cursos gratuitos y premiums por Emilce Brusa, narradora profesional.',
	keywords: 'Narración oral, cuentos, Emilce Brusa, curso de narración',
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
