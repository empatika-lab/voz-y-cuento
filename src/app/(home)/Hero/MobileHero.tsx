import NextImage from 'next/image';

/* Components */
import Button from '@/components/Button';

/* Assets */
import Emilce from '@images/emilce-hero-small.png';

/* Utils */
import ROUTES from '@/lib/utils/routes';

export default function MobileHero() {
	return (
		<header className="relative bg-gradient-2 lg:hidden h-[400px]">
			<div className="container py-[64px]">
				<h1 className="mt-10 max-w-[80%] font-display text-4xl font-normal leading-[1.2]">
					Explora el arte de contar historias
				</h1>
				<p className="mt-7 max-w-[55%]">
					Encuentra tu voz narradora con los cursos online de Voz y Cuento.
				</p>

				<div aria-hidden className="absolute bottom-0 right-0 overflow-hidden">
					<NextImage alt="" className="h-[280px] w-auto" src={Emilce} priority />
				</div>

				<Button className="relative top-10 font-bold px-8" href={ROUTES.EXPLORE} type="button">
					Ver Cursos
				</Button>
			</div>
		</header>
	);
}
