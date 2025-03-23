import NextImage from 'next/image';

/* Components */
import Button from '@/components/Button';

/* Assets */
import Emilce from '@images/emilce-hero-small.png';

/* Utils */
import ROUTES from '@/lib/utils/routes';

export default function MobileHero() {
	return (
		<header className="relative bg-gradient-2 pb-[64px] pt-[86px] lg:hidden">
			<div className="container">
				<h1 className="main-title max-w-[60%] font-display">Explora el arte de contar historias</h1>
				<p className="mb-12 mt-4 max-w-[55%] font-medium">
					Encuentra tu voz narradora con los cursos online de Voz y Cuento.
				</p>

				<Button className="font-bold" href={ROUTES.EXPLORE}>
					Ver Cursos
				</Button>

				<div aria-hidden className="absolute bottom-0 right-0 overflow-hidden">
					<NextImage alt="" className="h-[280px] w-auto" src={Emilce} priority />
				</div>
			</div>
		</header>
	);
}
