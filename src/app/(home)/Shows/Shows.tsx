import NextImage from 'next/image';

/* Assets */
import HireImage from '@images/contrataciones.png';

/* Components */
import Button from '@/components/Button';

export default function Shows() {
	return (
		<section className="relative py-[192px] lg:py-[257px]">
			<NextImage alt="Espectáculos" className="h-full w-full object-cover" fill src={HireImage} />

			<div className="absolute inset-0 bg-gradient-4 lg:bg-gradient-4" />

			<div className="container">
				<h1 className="relative font-display text-4xl leading-[1.2] lg:text-7xl ">Espectáculos</h1>
				<p className="relative my-6 text-black lg:my-12 lg:max-w-2xl lg:text-2xl">
					Opciones de espectáculos presenciales y/o virtuales para tu evento o proyecto escolar.
				</p>

				<Button
					className="relative mx-auto block w-fit text-center hover:bg-cyan-500 active:bg-cyan-500 lg:ml-0"
					href="/espectaculos"
					variant="outline"
				>
					Ver catálogo
				</Button>
			</div>
		</section>
	);
}
