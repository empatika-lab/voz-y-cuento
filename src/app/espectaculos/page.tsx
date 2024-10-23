import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

/* Utils */
import { prettyPrint } from '@/lib/utils/dev';
import { getCachedPayload } from '@/lib/utils/localApi';

/* Components */
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Layout/Footer';
import Hero from '@/components/Layout/Hero';
import HireMeCard from './components/HireMeCard';
import Button from '@/components/Button';
import { LandingNavbar } from '@/components/Layout/Navbar';

const breadcrumbItems = [
	{
		text: 'Espectáculos',
		href: '/espectaculos',
	},
];

async function fetchEvents() {
	const payload = await getPayloadHMR({
		config: configPromise,
	});

	const cachedPayload = getCachedPayload(payload);

	const events = cachedPayload
		.find({ collection: 'events', limit: 1000, sort: 'category' })
		.catch((e) => {
			prettyPrint(e);
		});

	return events;
}

export default async function HireMe() {
	const events = await fetchEvents();

	if (!events) {
		return null;
	}

	return (
		<>
			<LandingNavbar />
			<Hero>
				<div className="container pt-20 lg:pt-[148px">
					<h1 className="font-display relative text-4xl font-normal text-white lg:text-8xl">
						Espectáculos
					</h1>
				</div>
			</Hero>

			<main className="container pt-48 pb-16 w-full flex flex-col gap-10">
				<Breadcrumbs items={breadcrumbItems} />
				<ul className="flex flex-wrap gap-10 justify-center lg:justify-start">
					{events.docs.map((event) => {
						return <HireMeCard event={event} key={event.id} />;
					})}
				</ul>

				<Button className="py-16 mt-8 mx-auto text-center" href="https://wa.me/5492215677747">
					Contactame
				</Button>
			</main>
			<Footer />
		</>
	);
}
