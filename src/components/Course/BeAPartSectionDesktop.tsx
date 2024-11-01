import NextImage from 'next/image';

export default function BeAPartSectionDesktop() {
	return (
		<section className="bg-gradient-diamond hidden py-16 lg:block">
			<div className="container mx-auto">
				<h2 className="font-display text-center text-6xl text-white">
					Sé parte del universo de la narración oral
				</h2>

				<div className="mt-12 flex w-full justify-between">
					<article className="flex w-[800px] min-w-0 flex-col gap-4 text-balance text-white">
						<ul className="font-bold">
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

						<p className="mt-12 font-bold">No es necesario ningún conocimiento previo.</p>

						<p>
							<span className="font-bold">Curso de por vida:</span> a tu ritmo, sin fechas de
							entregas. Tu marcas tu propia agenda.
						</p>

						<p>
							<span className="font-bold">Comunidad narradora:</span> los cursos también te ofrecen
							la oportunidad de compartir tus propios proyectos con otros alumnos, además de que
							podrás realizarme todas las consultas que necesites.
						</p>

						<p>
							<span className="font-bold"> Certificado en formato PDF: </span>
							una vez entregadas todas las prácticas.
						</p>
					</article>

					<div className="flex w-[1/3] flex-col gap-5">
						<NextImage
							alt="Imagen real del curso"
							className="block h-auto w-full"
							height={200}
							src="/images/be-a-part-1.png"
							width={338}
						/>

						<NextImage
							alt="Imagen real del curso"
							className="block h-auto w-full"
							height={200}
							src="/images/be-a-part-2.png"
							width={338}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
