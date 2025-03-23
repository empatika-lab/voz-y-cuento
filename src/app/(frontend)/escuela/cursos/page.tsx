import { cookies } from 'next/headers';
import { getPayload } from 'payload';
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
import { prettyPrint } from '@/lib/utils/dev';

/* Types */
import type { Course } from '@/payload-types';

const breacrumbItems = [
	{
		text: 'Cursos',
		href: '/cursos',
	},
];

export const dynamic = 'force-dynamic';

async function fetchCourses(userId: number) {
	const payload = await getPayload({
		config: configPromise,
	});

	// Need user courses and pending payments to filter out the courses that the user has already bought
	const studentCourses = await payload.find({
		collection: 'students',
		limit: 1000,
		where: {
			id: {
				equals: userId,
			},
		},
		select: {
			courses: true,
		},
	});

	const pendingPayments = await payload.find({
		collection: 'pending',
		limit: 1000,
		where: {
			and: [
				{
					student: {
						equals: userId,
					},
				},
				{
					isPaid: {
						equals: false,
					},
				},
			],
		},
	});

	const pendingPaymentCourseIds = pendingPayments.docs.map(
		(payment) => (payment.course as Course).id,
	);
	const studentCourseIds = studentCourses.docs.map((student) =>
		(student.courses as Course[]).map((course) => course.id),
	);
	const toFilter = [...studentCourseIds, ...pendingPaymentCourseIds].flat();

	const courses = payload
		.find({
			collection: 'courses',
			limit: 1000,
			where: {
				id: {
					not_in: toFilter,
				},
			},
		})
		.catch((e) => {
			prettyPrint(e);
		});

	return courses;
}

export default async function AcademyPage() {
	const cookieStore = await cookies();
	const user = getUserFromJWT(cookieStore.get(SESSION_COOKIE_NAME)!.value);

	if (!user) {
		return null;
	}

	const courses = await fetchCourses(parseInt(user.id, 10));

	if (!courses) {
		return null;
	}

	return (
		<>
			<AcademyNavbar userName={user.name} />
			<Hero>
				<div className="container pt-20 lg:pt-4">
					<h1 className="relative font-display text-4xl font-normal tracking-wide text-white lg:text-8xl">
						Explora
					</h1>
					<p className="relative mt-4 font-medium tracking-wide text-white lg:mt-12 lg:text-2xl lg:font-bold">
						Cursos disponibles para continuar aprendiendo
					</p>
				</div>
			</Hero>
			<main className="container py-20">
				<Breadcrumbs items={breacrumbItems} isAcademy />
				<CourseCards courses={courses.docs} isAcademy />
			</main>
			<Footer />
		</>
	);
}
