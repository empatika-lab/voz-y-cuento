import type { Metadata } from 'next';

/* Styles */
import '@lib/styles/globals.css';

/* Fonts */
import localFont from 'next/font/local';
import { Raleway } from 'next/font/google';

const raleway = Raleway({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'],
	variable: '--font-sans',
});

const busther = localFont({
	src: '../../public/fonts/Busther.ttf',
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
		<html className="h-full" lang="es">
			<body
				className={`${raleway.variable} ${busther.variable} h-full bg-cyan-50 font-sans antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
