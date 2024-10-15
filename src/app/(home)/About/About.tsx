import NextImage from 'next/image';
import Image from '@images/emilce.png';

/* Components */
import Button from '@/components/Button';
import ROUTES from '@/lib/utils/routes';

export default function About() {
	return (
		<section className="container pb-32 lg:pb-[164px]">
			<div className="flex w-full flex-col items-center justify-between lg:flex-row">
				{/* Parte izquierda  */}
				<div className="mt-4 hidden w-[50%] lg:flex lg:justify-start">
					<NextImage
						alt="Emilce"
						className="rounded-full lg:ml-[-100px] lg:w-[540px]"
						src={Image}
					/>
				</div>

				{/* Parte derecha */}
				<div className="mt-4 w-full text-center lg:mt-0 lg:w-[592px] lg:text-right">
					<h2 className="font-display text-4xl text-gray-800 lg:mt-4 lg:text-7xl">
						Soy Emilce Brusa
					</h2>

					<div className="mx-auto my-3 w-full max-w-[50%] lg:hidden">
						<NextImage
							alt="Emilce"
							className="h-full w-full rounded-full object-cover"
							src={Image}
						/>
					</div>

					<p className="text-left text-base text-gray-900 lg:mt-12 lg:text-right lg:text-xl">
						Te invito a conocer mi historia narrativa. Desde mi trayectoria como docente de nivel
						inicial a convertirme en narradora oral escénica profesional con más de diez años de
						experiencia.
					</p>

					<Button
						className="relative top-10 bg-transparent text-center text-base lg:top-14"
						href={ROUTES.ABOUT}
						type="button"
					>
						Te cuento mi camino
					</Button>
				</div>
			</div>
		</section>
	);
}
