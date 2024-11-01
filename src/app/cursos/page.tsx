import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

/* Components */
import { LandingNavbar } from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import Hero from '@/components/Layout/Hero';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CourseCards } from '@/components/Course/CourseCards';

/* Utils */
import { prettyPrint } from '@/lib/utils/dev';

const breacrumbItems = [
	{
		text: 'Cursos',
		href: '/cursos',
	},
];

async function fetchCourses() {
	const payload = await getPayloadHMR({
		config: configPromise,
	});

	const courses = payload.find({ collection: 'courses', limit: 1000 }).catch((e) => {
		prettyPrint(e);
	});

	return courses;
}

export default async function CoursesPage() {
	const courses = await fetchCourses();

	if (!courses) {
		return null;
	}

	return (
		<>
			<LandingNavbar />
			<Hero>
				<div className="container pt-20 lg:pt-[148px]">
					<h1 className="relative font-display text-4xl font-normal text-white lg:text-8xl">
						Cursos disponibles
					</h1>
					<p className="relative mt-4 font-medium text-white lg:mt-12 lg:font-bold">
						Aprende el arte de contar historias.
					</p>
				</div>
			</Hero>
			<main className="container py-32">
				<Breadcrumbs items={breacrumbItems} />
				<CourseCards courses={courses.docs} />
			</main>
			<Footer />
		</>
	);
}
