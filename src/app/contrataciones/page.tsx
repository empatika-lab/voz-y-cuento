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

	const courses = cachedPayload.find({ collection: 'events', limit: 1000 }).catch((e) => {
		prettyPrint(e);
	});

	return courses;
}

export default async function HireMe() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const result = await getEvents();
	console.log(result);

	return (
		<>
			<LandingNavbar />
			<Hero>
				<div className="container pt-20">
					<h1 className="font-display relative text-4xl font-normal text-white lg:text-8xl">
						Espectáculos y talleres itinerantes
					</h1>
				</div>
			</Hero>
			<Breadcrumbs items={breadcrumbItems} />
			<Footer />
		</>
	);
}
