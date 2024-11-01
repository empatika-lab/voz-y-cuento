import NextImage from 'next/image';

/* Images */
import EmilceSm from '@images/emilce-sm.png';
import EmilceLg from '@images/emilce-lg.png';

/* Components */
import Button from '@/components/Button';

/* Utils */
import ROUTES from '@/lib/utils/routes';

export default function About() {
	return (
		<section className="container pb-24 lg:pb-[164px]">
			<div className="flex w-full flex-col items-center justify-between lg:flex-row">
				<div className="mt-4 hidden w-[50%] lg:flex lg:justify-start">
					<NextImage
						alt="Emilce"
						className="rounded-full lg:ml-[-100px] lg:w-[540px]"
						src={EmilceLg}
					/>
				</div>

				<div className="w-full text-center lg:w-[592px] lg:text-right">
					<h2 className="font-display subtitle text-gray-800 lg:-mt-6">Soy Emilce Brusa</h2>

					<div className="mx-auto my-3 w-[200px] h-[200px] relative -top-5 lg:hidden">
						<NextImage
							alt="Emilce"
							className="h-full w-full rounded-full object-cover"
							src={EmilceSm}
						/>
					</div>

					<p className="relative -top-10 lg:top-0 text-center text-base text-gray-900 lg:mt-16 lg:text-right lg:text-xl">
						Te invito a conocer mi historia. Desde mi trayectoria como docente de nivel inicial a
						convertirme en narradora oral escénica profesional con más de quince años de
						experiencia.
					</p>

					<Button
						className="relative top-4 bg-transparent text-center text-base lg:top-16"
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
