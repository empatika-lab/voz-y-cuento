import NextImage from 'next/image';

/* Components */
import Button from '@/components/Button';

/* Utils */
import ROUTES from '@/lib/utils/routes';

/* Assets */
import Arrow from '@images/icons/arrow-right.svg';

export default function LoginBackButton() {
	return (
		<Button
			className="mt-8 text-center text-sm w-full max-w-none mx-auto block"
			href={ROUTES.HOME}
			type="button"
			variant="ghost"
		>
			<div className="flex gap-4 justify-center ">
				<NextImage
					src={Arrow}
					alt="Regresar a la página inicial"
					className="w-4 h-auto rotate-180"
				/>
				<span className="text-sm">Regresar</span>
			</div>
		</Button>
	);
}
