import configPromise from '@payload-config';
import { getPayload } from 'payload';

/* Components */
import { LandingNavbar } from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import Hero from '@/components/Layout/Hero';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CourseCards } from '@/components/Course/CourseCards';

/* Utils */
import { prettyPrint } from '@/lib/utils/dev';

export const dynamic = 'force-dynamic';

const breacrumbItems = [
	{
		text: 'Cursos',
		href: '/cursos',
	},
];

async function fetchCourses() {
	const payload = await getPayload({
		config: configPromise,
	});

	const courses = payload
		.find({
			collection: 'courses',
			limit: 1000,
			where: {
				isPublished: {
					equals: true,
				},
			},
		})
		.catch((e) => {
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
				<div className="container pt-20 lg:pt-[128px]">
					<h1 className="relative font-display text-4xl font-normal tracking-wide text-white lg:text-8xl">
						<span className="pr-2">C</span>
						<span>ursos disponibles</span>
					</h1>
					<p className="relative mt-4 font-medium text-white lg:mt-12 lg:font-bold">
						Aprende el arte de contar historias.
					</p>
				</div>
			</Hero>
			<main className="container py-16 pb-32">
				<Breadcrumbs items={breacrumbItems} />
				<CourseCards courses={courses.docs} />
			</main>
			<Footer />
		</>
	);
}
