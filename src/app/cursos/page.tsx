/* Hero */
import Footer from '@/components/Layout/Footer';
import Hero from '@/components/Layout/Hero';
import { LandingNavbar } from '@/components/Layout/Navbar';
import { payload } from '@/lib/utils/api';

function fetchCourses() {
	const a = payload.find({ collection: 'courses' }).catch((e) => {
		console.log(`[fetchCourses]`, e);
	});

	return a;
}

export default async function CoursesPage() {
	const courses = await fetchCourses();

	console.log(courses);

	if (!courses) {
		return null;
	}

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
