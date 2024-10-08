import { cookies } from 'next/headers';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';

/* Utils */
import { getUserFromJWT, SESSION_COOKIE_NAME } from '@/lib/utils/auth';

/* Components */
import { AcademyNavbar } from '@/components/Layout/Navbar';
import { CourseCards } from '@/components/Course/CourseCards';
import Footer from '@/components/Layout/Footer';
import Hero from '@/components/Layout/Hero';
import Breadcrumbs from '@/components/Breadcrumbs';

/* Utils */
import { getCachedPayload } from '@/lib/utils/localApi';
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
	const cachedPayload = getCachedPayload(payload);

	const courses = cachedPayload.find({ collection: 'courses', limit: 1000 }).catch((e) => {
		prettyPrint(e);
	});

	return courses;
}

export default async function AcademyPage() {
	const cookieStore = await cookies();

	const user = getUserFromJWT(cookieStore.get(SESSION_COOKIE_NAME)!.value);

	const courses = await fetchCourses();

	if (!courses || !user) {
		return null;
	}

	return (
		<>
			<AcademyNavbar userName={user.name} />
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
				<Breadcrumbs items={breacrumbItems} isAcademy />
				<CourseCards courses={courses} isAcademy />
			</main>
			<Footer />
		</>
	);
}
