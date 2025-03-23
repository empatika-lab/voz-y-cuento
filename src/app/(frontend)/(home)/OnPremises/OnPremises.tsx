/* Images */
import Button from '@/components/Button';
import Suitcase from '@images/suitcase.svg';

/* Next */
import NextImage from 'next/image';

export default function OnPremises() {
	return (
		<section className="bg-yellow-50 py-12 lg:py-24">
			<div className="container">
				<h2 className="subtitle text-left font-display lg:text-center">
					¡Voz y cuento también sale de viaje!
				</h2>

				<div className="mt-6 flex flex-col-reverse gap-6 sm:flex-row lg:mt-20 lg:gap-14">
					<div className="flex flex-col text-pretty font-medium lg:text-2xl">
						<p>
							La Escuela de Narración Oral no sólo ofrece cursos virtuales, sino que también
							organiza
							<strong> talleres presenciales</strong> coordinando con tu biblioteca, Institución
							educativa u oraganización.
						</p>
						<p className="mt-6">Escríbeme para recibir más detalles.</p>

						<footer className="mt-12 lg:mx-0 lg:mt-20">
							<Button className="text-center lg:px-24" href="https://wa.me/5492215677747">
								Contáctame
							</Button>
						</footer>
					</div>

					<NextImage
						src={Suitcase}
						alt="Valija de viaje"
						className="mx-auto h-[164px] w-[164px] sm:mx-0 lg:h-[373px] lg:w-[542px]"
					/>
				</div>
			</div>
		</section>
	);
}
