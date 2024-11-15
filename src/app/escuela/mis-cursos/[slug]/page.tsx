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
import CourseNavigatorMobile from './CourseNavigatorMobile';

/* Types */
import type { Course } from '@/payload-types';

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

export const dynamic = 'force-dynamic';

export default async function SchoolCoursePage({ params }: SchoolCoursePageProps) {
	const slug = (await params).slug;
	const currentBlock = (await params).block ?? 0;

	const payload = await getPayloadHMR({
		config: configPromise,
	});

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

	const studentData = await payload
		.findByID({
			collection: 'students',
			id: user.id,
			select: {
				id: true,
				courses: true,
			},
		})
		.catch((e) => {
			prettyPrint(e);
		});

	const studentCourses = (studentData?.courses?.filter(Boolean) ?? []) as Course[];

	// Check if the user is enrolled in the course
	const isEnrolled = studentCourses?.some((studentCourse) => {
		return studentCourse.id === course.id;
	});

	if (!isEnrolled) {
		return null;
	}

	return (
		<>
			<AcademyNavbar userName={user.name} />

			<main className="mt-[62px]">
				<CourseNavigatorMobile course={course} currentBlock={currentBlock} />
				{/* <CourseNavigatorDesktop course={course} /> */}
			</main>
		</>
	);
}
