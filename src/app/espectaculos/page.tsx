import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

/* Utils */
import { prettyPrint } from '@/lib/utils/dev';

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
export const dynamic = 'force-dynamic';

async function fetchEvents() {
	const payload = await getPayloadHMR({
		config: configPromise,
	});

	const events = await payload.find({ collection: 'events', sort: 'category' }).catch((e) => {
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
				<div className="container pt-20 lg:pt-[148px]">
					<h1 className="relative font-display text-4xl font-normal text-white lg:text-8xl">
						Espectáculos
					</h1>
				</div>
			</Hero>

			<main className="container flex w-full flex-col gap-10 pb-16 pt-48">
				<Breadcrumbs items={breadcrumbItems} />
				<ul className="flex flex-wrap justify-center gap-10 lg:justify-start">
					{events.docs.map((event) => {
						return <HireMeCard event={event} key={event.id} />;
					})}
				</ul>

				<Button className="mx-auto mt-8 py-16 text-center" href="https://wa.me/5492215677747">
					Contactame
				</Button>
			</main>
			<Footer />
		</>
	);
}
