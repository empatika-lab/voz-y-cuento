import NextImage from 'next/image';

/* Components */
import Button from '@frontend/components/Button';

/* Assets */
import Emilce from '@images/emilce-photo-big.png';
import Bird1 from '@images/bird-1-big.svg';
import Bird2 from '@images/bird-2-big.svg';
import Books from '@images/books-big.svg';
import Book from '@images/book-big.svg';

/* Utils */
import ROUTES from '@/lib/utils/routes';

export default function DesktopHero() {
	return (
		<header className="relative hidden bg-gradient-2 py-[120px] lg:flex">
			<div className="container pb-20">
				<h1 className="max-w-[50%] pt-2 font-display text-8xl font-normal">
					Explora el arte de contar historias
				</h1>
				<p className="mt-10 max-w-[50%] text-xl">
					Encuentra tu voz narradora con los cursos online de Voz y Cuento.
				</p>

				<div
					aria-hidden
					className="absolute bottom-0 right-0 overflow-hidden xl:right-[32px] 2xl:right-[302px]"
				>
					<NextImage alt="" className="h-auto w-[472px]" src={Emilce} />
				</div>

				<NextImage
					alt=""
					className="absolute right-[40%] top-[20%]"
					src={Bird1}
				/>
				<NextImage
					alt=""
					className="absolute right-[3%] top-[5%] 2xl:right-[17%]"
					src={Bird2}
				/>
				<NextImage
					alt=""
					className="absolute right-[3%] top-[30%] 2xl:right-[17%]"
					src={Book}
				/>
				<NextImage
					alt=""
					className="absolute -bottom-12 right-[33%] xl:right-[25%] 2xl:right-[33%] "
					src={Books}
				/>

				<Button
					className="relative top-16 text-center text-base"
					href={ROUTES.EXPLORE}
					type="button"
				>
					¡Empecemos la aventura!
				</Button>
			</div>
		</header>
	);
}
