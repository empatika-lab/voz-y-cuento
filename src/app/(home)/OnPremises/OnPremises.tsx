/* Images */
import Button from '@/components/Button';
import Suitcase from '@images/suitcase.svg';

/* Next */
import NextImage from 'next/image';

export default function OnPremises() {
	return (
		<section className="container py-24 pb-40">
			<h2 className="font-display text-center text-4xl lg:text-7xl">
				¡VozYcuento también sale de viaje!
			</h2>
			<div className="flex flex-col lg:flex-row mt-20 items-center gap-14">
				<div className="flex flex-col lg:text-2xl text-pretty">
					<p>
						La Escuela de Narración Oral no sólo ofrece cursos virtuales, sino que también organiza
						<strong> talleres presenciales</strong> coordinando con tu biblioteca, Institución
						educativa u oraganización.
					</p>
					<p className="mt-14">Escribime para recibir más detalles.</p>

					<Button className="py-16 mt-20 text-center w-fit" href="https://wa.me/5492215677747">
						Contáctame
					</Button>
				</div>

				<NextImage src={Suitcase} alt="Valija de viaje" className="mt-16 lg:mt-0" />
			</div>
		</section>
	);
}
