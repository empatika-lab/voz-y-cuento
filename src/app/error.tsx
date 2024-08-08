'use client';

import { useEffect } from 'react';

/* Components */
import Button from '@/components/Button';

/* Utils */
import ROUTES from '@/lib/utils/routes';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// eslint-disable-next-line no-console
		console.error(error);
	}, [error]);

	return (
		<article className="h-full px-5 py-10 flex items-center flex-col justify-center md:max-w-[420px] mx-auto">
			<h1 className="font-bold text-xl lg:text-3xl text-red-600 text-center">
				¡Uy! Hubo un error inesperado.
			</h1>

			<p className="mt-6">Por favor, asegurate de tener conexión a internet.</p>

			<footer className="flex flex-col gap-4 mt-12 w-full">
				<Button onClick={reset}>Reintentar</Button>
				<Button href={ROUTES.HOME} variant="outline" className="text-center">
					Volver al inicio
				</Button>
			</footer>
		</article>
	);
}
