import NextImage from 'next/image';

/* Components */
import Button from '@/components/Button';

/* Assets */
import Emilce from '@images/emilce-hero-small.png';

/* Utils */
import ROUTES from '@/lib/utils/routes';

export default function MobileHero() {
	return (
		<header className="relative bg-gradient-2 lg:hidden pt-[86px] pb-[64px]">
			<div className="container">
				<h1 className="main-title font-display max-w-[60%]">Explora el arte de contar historias</h1>
				<p className="max-w-[55%] mt-4 mb-12">
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
