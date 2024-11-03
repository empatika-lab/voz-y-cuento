import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

/* Utils */
import { prettyPrint } from '@/lib/utils/dev';
import { getUserFromJWT, SESSION_COOKIE_NAME } from '@/lib/utils/auth';
import ROUTES from '@/lib/utils/routes';

/* Components */
import { AcademyNavbar } from '@/components/Layout/Navbar';
import Hero from '@/components/Layout/Hero';
import CourseNavigatorMobile from './CourseNavigatorMobile';

async function fetchCourse(slug: string) {
	try {
		const payload = await getPayloadHMR({
			config: configPromise,
		});

		const course = await payload
			.find({
				collection: 'courses',
				where: {
					slug: { equals: slug },
				},
			})
			.catch((e) => {
				prettyPrint(e);
				return null;
			});

		return course?.docs[0] ?? null;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Error inesperado al traer datos del curso.', error);
		return null;
	}
}

interface SchoolCoursePageProps {
	params: Promise<{
		slug: string;
		block: number;
	}>;
}

export default async function SchoolCoursePage({ params }: SchoolCoursePageProps) {
	const slug = (await params).slug;
	const currentBlock = (await params).block ?? 0;

	if (!slug) {
		return notFound();
	}

	const course = await fetchCourse(slug);

	if (!course) {
		notFound();
	}

	const cookieStore = await cookies();

	const user = getUserFromJWT(cookieStore.get(SESSION_COOKIE_NAME)!.value);

	if (!user) {
		return redirect(ROUTES.LOGIN);
	}

	// Check if the user is enrolled in the course
	const isEnrolled = user.courses?.some((courseId) => {
		return courseId === course.id;
	});

	if (!isEnrolled) {
		return null;
	}

	return (
		<>
			<AcademyNavbar userName={user.name} />
			<Hero>
				<div className="container pt-24">
					<h1 className="relative font-display text-4xl font-normal text-white lg:text-8xl">
						{course.name.replaceAll('.', '')}
					</h1>
				</div>
			</Hero>

			<main className="mt-24 pb-16">
				<CourseNavigatorMobile course={course} currentBlock={currentBlock} />
				{/* <CourseNavigatorDesktop course={course} /> */}
			</main>
		</>
	);
}
