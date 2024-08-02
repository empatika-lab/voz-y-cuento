import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

/* Hero */
import Footer from '@/components/Layout/Footer';
import Hero from '@/components/Layout/Hero';
import { LandingNavbar } from '@/components/Layout/Navbar';

/* Utils */
import { getCachedPayload } from '@/lib/utils/api';
import { prettyPrint } from '@/lib/utils/dev';

async function fetchCourses() {
	const payload = await getPayloadHMR({
		config: configPromise,
	});
	const cachedPayload = getCachedPayload(payload);

	const courses = cachedPayload.find({ collection: 'courses' }).catch((e) => {
		prettyPrint(e);
	});

	return courses;
}

export default async function CoursesPage() {
	const courses = await fetchCourses();
	// eslint-disable-next-line no-console
	console.log(courses);

	return (
		<>
			<LandingNavbar />
			<Hero>
				<div className="container pt-20">
					<h1 className="font-display relative text-4xl font-normal text-white lg:text-8xl">
						Cursos disponibles
					</h1>
					<p className="relative mt-4 font-medium text-white lg:mt-12 lg:font-bold">
						Aprende el arte de contar historias.
					</p>
				</div>
			</Hero>
			<main className="container py-20">
				{/* <Breadcrumbs items={breacrumbItems} />
				<CourseCards courses={courses} /> */}
			</main>
			<Footer />
		</>
	);
}
