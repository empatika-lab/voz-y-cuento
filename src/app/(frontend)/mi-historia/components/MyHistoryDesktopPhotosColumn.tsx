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

export default function MyHistoryDesktopPhotosColumn() {
	return (
		<div className="flex flex-col justify-between">
			{photos.map((photo) => {
				return (
					<NextImage
						key={photo.id}
						alt="Soy Emilce Brusa"
						height={214}
						src={photo.scr}
						width={356}
					/>
				);
			})}
		</div>
	);
}
