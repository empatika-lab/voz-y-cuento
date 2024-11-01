import NextImage from 'next/image';

const socialItems = [
	{
		name: 'Instagram',
		icon: '/images/instagram.svg',
		href: 'https://www.instagram.com/emilcebrusa',
	},
	{
		name: 'Youtube',
		icon: '/images/youtube.svg',
		href: 'https://www.youtube.com/channel/UC3keUThB_-OgV_NKyJvAqtg',
	},
	{
		name: 'Facebook',
		icon: '/images/facebook.svg',
		href: 'https://www.facebook.com/EmilceNarradora',
	},
];

export default function FooterSocial() {
	return (
		<section className="container mx-auto border-b-2 border-black py-6 lg:py-8">
			<div className="flex flex-wrap items-center ">
				<p className="text-center lg:max-w-[66%] lg:text-left lg:text-2xl">
					Sígueme en mis redes sociales. Allí comparto mucho más sobre este maravilloso arte. ¡Te
					espero!
				</p>

				<ul className="mx-auto mt-8 flex gap-8 lg:mr-0 lg:mt-0 lg:justify-end">
					{socialItems.map((socialItem) => (
						<li key={socialItem.name}>
							<a href={socialItem.href} rel="noreferrer" target="_blank">
								<NextImage
									alt={`Visitá mi ${socialItem.name}`}
									className="h-auto w-8 lg:w-14"
									height={874}
									src={socialItem.icon}
									width={360}
								/>
							</a>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
