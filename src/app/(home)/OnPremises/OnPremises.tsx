/* Images */
import Suitcase from '@images/suitcase.svg';

/* Next */
import NextImage from 'next/image';

export default function OnPremises() {
	return (
		<section className="container pb-16 pt-24">
			<h2 className="font-display text-center text-4xl lg:text-7xl">
				¡VozYcuento también sale de viaje!
			</h2>
			<div className="flex flex-col lg:flex-row mt-8 items-center">
				<div className="flex flex-col gap-4 lg:text-2xl">
					<p>
						La Escuela de Narración Oral no solo ofrece cursos virtuales, sino que también organiza
						talleres presenciales coordinando con tu biblioteca, Institución educativa u
						oraganización.
					</p>
					<p className="mt-10">Si querés saber más no dudes en Contactarme.</p>
				</div>

				<NextImage src={Suitcase} alt="Valija de viaje" className="mt-16 lg:mt-0" />
			</div>
		</section>
	);
}
