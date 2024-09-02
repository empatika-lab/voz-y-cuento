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

const breadcrumbItems = [
	{
		text: 'Contrataciones',
		href: '/contrataciones',
	},
];

export async function getEvents() {
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
	const events = await getEvents();

	if (!events) {
		return null;
	}

	console.log(events);

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

			<main className="container py-20">
				<Breadcrumbs items={breadcrumbItems} />
				<ul className="flex flex-col lg:flex-row mt-10 lg:mt-12 gap-10 item-center justify-center">
					{events.docs.map((event) => {
						return <HireMeCard event={event} key={event.id} />;
					})}
				</ul>
			</main>
			<Footer />
		</>
	);
}
