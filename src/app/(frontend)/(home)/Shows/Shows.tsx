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

			<div className="gradient-4 absolute inset-0" />

			<div className="container relative">
				<h2 className="subtitle font-display">Espectáculos</h2>
				<p className="mb-12 mt-6 max-w-[75%] font-medium text-black lg:mt-12 lg:max-w-2xl lg:text-2xl">
					Opciones de espectáculos presenciales y/o virtuales para tu evento o proyecto escolar.
				</p>

				<Button
					className="mr-auto text-center hover:bg-cyan-500 active:bg-cyan-500 lg:mx-auto lg:ml-0"
					href="/espectaculos"
					variant="outline"
				>
					Ver catálogo
				</Button>
			</div>
		</section>
	);
}
