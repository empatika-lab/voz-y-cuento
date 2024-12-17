import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

/* Utils */
import { prettyPrint } from '@/lib/utils/dev';
import { getUserFromJWT, SESSION_COOKIE_NAME } from '@/lib/utils/auth';
import ROUTES from '@/lib/utils/routes';

/* Components */
import { AcademyNavbar } from '@/components/Layout/Navbar';
import CourseNavigatorMobile from './components/CourseNavigatorMobile';

/* Types */
import type { Course } from '@/payload-types';

async function fetchCourse(slug: string) {
	try {
		const payload = await getPayload({
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
	searchParams: Promise<{
		slug: string;
		block: string;
		lesson: string;
		index: string;
	}>;
	params: Promise<{
		slug: string;
	}>;
}

export const dynamic = 'force-dynamic';

export default async function SchoolCoursePage({ searchParams, params }: SchoolCoursePageProps) {
	const slug = (await params).slug;
	const currentBlock = (await searchParams).block ?? 0;
	const currentLesson = (await searchParams).lesson ?? 0;
	const isShowingIndex = (await searchParams).index === 'true';

	const payload = await getPayload({
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

	if (!isEnrolled || !studentData?.id) {
		return null;
	}

	const totalBlocks = course.blocks?.length ?? 0;
	const totalLessons = course.blocks?.[parseInt(currentBlock, 10)]?.content?.length ?? 0;

	return (
		<>
			<AcademyNavbar userName={user.name} isHidden={isShowingIndex} />

			<main className="mt-[62px] h-full">
				<CourseNavigatorMobile
					course={course}
					currentBlock={parseInt(currentBlock, 10)}
					currentLesson={parseInt(currentLesson, 10)}
					totalBlocks={totalBlocks}
					totalLessons={totalLessons}
					isShowingIndex={isShowingIndex}
					studentId={studentData.id}
				/>
				{/* <CourseNavigatorDesktop course={course} /> */}
			</main>
		</>
	);
}
