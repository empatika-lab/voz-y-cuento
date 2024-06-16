/* Utils */
import api from '@/lib/utils/api';

/* Components */
import { LandingNavbar } from '@components/Layout/Navbar/LandingNavbar';
import Footer from '@components/Layout/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Hero from '@/components/Layout/Hero';
import { CourseCards } from '@frontend/app/cursos/components/CourseCards';

/* Types */
import { Course } from '@voz-y-cuento/types';

const breacrumbItems = [
	{
		text: 'Cursos',
		href: '/cursos',
	},
];

async function fetchCourses() {
	try {
		const response = await api<{ data: Course[] }>({
			endpoint: '/courses?populate=*',
			role: 'admin',
			config: {
				next: {
					tags: ['course'],
				},
			},
		});

		if (!response.success) {
			return null;
		}

		return response.data;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Error inesperado al traer datos de cursos.');

		return null;
	}
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
				<Breadcrumbs items={breacrumbItems} />
				<CourseCards courses={courses} />
			</main>
			<Footer />
		</>
	);
}
