import NextImage from 'next/image';

/* Components */
import Button from '@/components/Button';

/* Assets */
import Emilce from '@images/emilce-hero-small.png';
import Bird1 from '@images/bird-1-small.svg';
import Bird2 from '@images/bird-2-small.svg';
import Books from '@images/books-small.svg';
import Book from '@images/book-small.svg';

/* Utils */
import ROUTES from '@/lib/utils/routes';

export default function MobileHero() {
	return (
		<header className="relative bg-gradient-2 lg:hidden h-[440px]">
			<div className="container py-[64px]">
				<h1 className="mt-10 max-w-[80%] font-display text-4xl font-normal leading-[1.2]">
					Explora el arte de contar historias
				</h1>
				<p className="mt-7 max-w-[66%]">
					Encuentra tu voz narradora con los cursos online de Voz y Cuento.
				</p>

				<div aria-hidden className="absolute bottom-0 right-0 overflow-hidden">
					<NextImage alt="" className="h-[224px] w-auto" src={Emilce} priority />
				</div>

				<NextImage alt="" className="absolute right-[25%] top-[40%]" src={Bird1} priority />
				<NextImage alt="" className="absolute right-0 top-[35%]" src={Bird2} priority />
				<NextImage alt="" className="absolute bottom-1 right-0" src={Book} priority />
				<NextImage alt="" className="absolute -bottom-5 right-[25%]" src={Books} priority />

				<Button className="relative top-10 font-bold" href={ROUTES.EXPLORE} type="button">
					Ver Cursos
				</Button>
			</div>
		</header>
	);
}
