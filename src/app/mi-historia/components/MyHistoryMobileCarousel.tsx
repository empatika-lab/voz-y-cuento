import NextImage from 'next/image';

/* Assets */
import photoOne from '@images/sobre-mi-1.png';
import photoTwo from '@images/sobre-mi-2.png';
import photoThree from '@images/sobre-mi-3.png';

const photos = [
	{ id: 1, scr: photoOne },
	{ id: 2, scr: photoTwo },
	{ id: 3, scr: photoThree },
];

export default function MyHistoryMobileCarousel() {
	return (
		<article className="container max-w-full overflow-scroll lg:hidden">
			<div className="flex w-[976px] snap-x snap-mandatory gap-3 overflow-scroll">
				{photos.map((photo) => {
					return (
						<div key={photo.id} className="h-[192px] w-[320px] snap-center snap-always">
							<NextImage
								alt="Soy Emilce Brusa"
								className="h-[192px] w-[320px] flex-1"
								height={192}
								src={photo.scr}
								width={320}
							/>
						</div>
					);
				})}
			</div>
		</article>
	);
}
