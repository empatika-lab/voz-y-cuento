import NextImage from 'next/image';

export default function BeAPartSectionMobile() {
	return (
		<section className="bg-gradient-diamond py-16 lg:hidden">
			<div className="container">
				<h2 className="font-display text-4xl text-white">
					Sé parte del universo de la narración oral
				</h2>

				<article className="flex flex-col gap-4 text-white">
					<div className="mt-12 flex flex-col gap-4">
						<NextImage
							alt="Imagen real del curso"
							className="w-full"
							height={200}
							src="/images/be-a-part-1.png"
							width={200}
						/>

						<NextImage
							alt="Imagen real del curso"
							className="w-full"
							height={200}
							src="/images/be-a-part-2.png"
							width={200}
						/>
					</div>

					<ul className="my-6 font-bold">
						<li className="flex gap-2">
							VIDEOS{' '}
							<NextImage
								alt="Incluído"
								height={16}
								src={'/images/icons/white-check.svg'}
								width={16}
							/>
						</li>
						<li className="flex gap-2">
							BIBLIOTECA{' '}
							<NextImage
								alt="Incluído"
								height={16}
								src={'/images/icons/white-check.svg'}
								width={16}
							/>
						</li>
						<li className="flex gap-2">
							RECURSOS ADICIONALES{' '}
							<NextImage
								alt="Incluído"
								height={16}
								src={'/images/icons/white-check.svg'}
								width={16}
							/>
						</li>
					</ul>

					<p className="font-bold">No es necesario ningún conocimiento previo.</p>
					<p>
						<span className="font-bold">Curso de por vida:</span> a tu ritmo, sin fechas de
						entregas. Tu marcas tu propia agenda.
					</p>
					<p>
						<span className="font-bold">Comunidad narradora:</span> los cursos también te ofrecen la
						oportunidad de compartir tus propios proyectos con otros alumnos, además de que podrás
						realizarme todas las consultas que necesites.
					</p>
					<p>
						<span className="font-bold"> Certificado en formato PDF: </span>
						una vez entregadas todas las prácticas.
					</p>
				</article>
			</div>
		</section>
	);
}
