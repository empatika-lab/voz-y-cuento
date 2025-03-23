import NextImage from 'next/image';
import NextLink from 'next/link';

/* Images */
import Logo from '@images/logo.png';

/* Utils */
import ROUTES from '@/lib/utils/routes';

const footerLinks = [
	{
		title: 'Secciones',
		items: [
			{
				label: 'Cursos',
				href: ROUTES.EXPLORE,
			},
			{
				label: 'Mi historia',
				href: ROUTES.ABOUT,
			},
			{
				label: 'Espectáculos',
				href: ROUTES.HIRE,
			},
		],
	},
	{
		title: 'Contacto',
		items: [
			{
				label: 'La Plata, Buenos Aires, Argentina.',
				href: '',
			},
			{
				label: 'emibrusant@gmail.com',
				href: 'mailto:emibrusant@gmail.com',
			},
		],
	},
];

export default function FooterSideNav() {
	return (
		<section className="container flex flex-wrap gap-4 pt-6">
			<header className="w-[152px] lg:w-[260px] xl:w-[320px]">
				<figure>
					<NextImage alt="Logo de Voz y Cuento" className="h-auto w-[105px]" src={Logo} />
					<figcaption className="max-w-[80%] pt-2 text-sm font-medium lg:mt-5 lg:pt-0">
						Escuela de narración oral escénica.
					</figcaption>
				</figure>
			</header>

			{footerLinks.map((section) => (
				<nav
					key={section.title}
					className="w-[152px] md:w-auto md:max-w-[152px] lg:w-[260px] xl:w-[320px]"
				>
					<strong className="font-bold lg:text-2xl">{section.title}</strong>

					<ul className="flex flex-col gap-[16px] pt-[20px]">
						{section.items.map((item) =>
							item.href ? (
								<li key={item.label} className="text-sm font-medium lg:text-base">
									<NextLink href={item.href}>{item.label}</NextLink>
								</li>
							) : (
								<li key={item.label} className="text-sm font-medium lg:text-base">
									{item.label}
								</li>
							),
						)}
					</ul>
				</nav>
			))}
		</section>
	);
}
