export default function FooterAdvert() {
	return (
		<article className="bg-cyan-25 border-b-2 border-black py-8">
			<div className="container mx-auto">
				<strong className="text-xl lg:text-3xl">
					¿Necesitas ampliar tu repertorio con libros que desafíen tu capacidad narradora?
				</strong>
				<p className="mt-6 font-medium lg:text-2xl">
					Visita{' '}
					<a
						className="text-red-600 font-bold"
						href="https://www.instagram.com/libreriavozycuento"
						target="_blank"
					>
						Librería Nómada Voz y cuento
					</a>{' '}
					y conoce nuestra selección de libros.
				</p>
			</div>
		</article>
	);
}
