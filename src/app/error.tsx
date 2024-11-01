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
		<article className="mx-auto flex h-full flex-col items-center justify-center px-5 py-10 md:max-w-[420px]">
			<h1 className="text-center text-xl font-bold text-red-600 lg:text-3xl">
				¡Uy! Hubo un error inesperado.
			</h1>

			<p className="mt-6">Por favor, asegurate de tener conexión a internet.</p>

			<footer className="mt-12 flex w-full flex-col gap-4">
				<Button onClick={reset}>Reintentar</Button>
				<Button href={ROUTES.HOME} variant="outline" className="text-center">
					Volver al inicio
				</Button>
			</footer>
		</article>
	);
}
