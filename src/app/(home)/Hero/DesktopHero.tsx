import NextImage from 'next/image';

/* Components */
import Button from '@/components/Button';

/* Assets */
import Emilce from '@images/emilce-photo-big.png';

/* Utils */
import ROUTES from '@/lib/utils/routes';

export default function DesktopHero() {
	return (
		<header className="relative hidden bg-gradient-2 pt-[200px] pb-[120px] lg:flex">
			<div className="container pb-20">
				<h1 className="max-w-[50%] pt-2 font-display main-title">
					Explora el arte de contar historias
				</h1>
				<p className="mt-12 max-w-[50%] text-xl">
					Encuentra tu voz narradora con los cursos online de Voz y Cuento.
				</p>

				<div
					aria-hidden
					className="absolute bottom-0 right-0 overflow-hidden xl:right-[96px] 2xl:right-[364px]"
				>
					<NextImage alt="" className="h-auto w-[472px]" src={Emilce} />
				</div>

				<Button className="relative top-16 text-center" href={ROUTES.EXPLORE} type="button">
					Ver Cursos
				</Button>
			</div>
		</header>
	);
}
