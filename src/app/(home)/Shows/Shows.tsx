import NextImage from 'next/image';

/* Images */
import ShowsSm from '@images/shows-sm.png';
import ShowsLg from '@images/shows-lg.png';

/* Components */
import Button from '@/components/Button';

export default function Shows() {
	return (
		<section className="relative py-12 lg:py-[257px]">
			<div className="lg:hidden">
				<NextImage alt="Espectáculos" className="h-full w-full object-cover" fill src={ShowsSm} />
			</div>

			<div className="hidden lg:block">
				<NextImage alt="Espectáculos" className="h-full w-full object-cover" fill src={ShowsLg} />
			</div>

			<div className="absolute inset-0 gradient-4" />

			<div className="relative container">
				<h2 className="font-display subtitle">Espectáculos</h2>
				<p className="mt-6 mb-12 text-black lg:mt-12 lg:max-w-2xl lg:text-2xl max-w-[75%]">
					Opciones de espectáculos presenciales y/o virtuales para tu evento o proyecto escolar.
				</p>

				<Button
					className="mr-auto lg:mx-auto text-center hover:bg-cyan-500 active:bg-cyan-500 lg:ml-0"
					href="/espectaculos"
					variant="outline"
				>
					Ver catálogo
				</Button>
			</div>
		</section>
	);
}
