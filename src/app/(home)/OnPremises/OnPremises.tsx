/* Images */
import Button from '@/components/Button';
import Suitcase from '@images/suitcase.svg';

/* Next */
import NextImage from 'next/image';

export default function OnPremises() {
	return (
		<section className="py-12 lg:py-24 bg-yellow-50">
			<div className="container">
				<h2 className="font-display text-left lg:text-center subtitle">
					¡Voz y cuento también sale de viaje!
				</h2>

				<div className="flex flex-col-reverse sm:flex-row mt-6 lg:mt-20 gap-6 lg:gap-14">
					<div className="flex flex-col lg:text-2xl text-pretty">
						<p>
							La Escuela de Narración Oral no sólo ofrece cursos virtuales, sino que también
							organiza
							<strong> talleres presenciales</strong> coordinando con tu biblioteca, Institución
							educativa u oraganización.
						</p>
						<p className="mt-6">Escríbeme para recibir más detalles.</p>

						<footer className="mt-12 lg:mx-0 lg:mt-20">
							<Button className="text-center lg:px-24 " href="https://wa.me/5492215677747">
								Contáctame
							</Button>
						</footer>
					</div>

					<NextImage
						src={Suitcase}
						alt="Valija de viaje"
						className="w-[164px] h-[164px] lg:w-[542px] lg:h-[373px] mx-auto sm:mx-0"
					/>
				</div>
			</div>
		</section>
	);
}
