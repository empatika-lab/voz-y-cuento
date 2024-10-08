import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

/* Utils */
import { prettyPrint } from '@/lib/utils/dev';
import { getCachedPayload } from '@/lib/utils/localApi';

/* Components */
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Layout/Footer';
import Hero from '@/components/Layout/Hero';
import { LandingNavbar } from '@/components/Layout/Navbar';
import HireMeCard from './components/HireMeCard';
import Button from '@/components/Button';

/* Icons */

const breadcrumbItems = [
	{
		text: 'Contrataciones',
		href: '/contrataciones',
	},
];

async function fetchEvents() {
	const payload = await getPayloadHMR({
		config: configPromise,
	});
	const cachedPayload = getCachedPayload(payload);

	const events = cachedPayload.find({ collection: 'events', limit: 1000 }).catch((e) => {
		prettyPrint(e);
	});

	return events;
}

export default async function HireMe() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const events = await fetchEvents();

	if (!events) {
		return null;
	}

	return (
		<>
			<LandingNavbar />
			<Hero>
				<div className="container pt-32">
					<h1 className="font-display relative text-4xl font-normal text-white lg:text-8xl">
						Espectáculos y talleres itinerantes
					</h1>
				</div>
			</Hero>

			<main className="container pt-32 pb-16 w-full flex flex-col gap-10">
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
