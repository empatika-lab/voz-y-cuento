import configPromise from '@payload-config';
import NextLink from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getPayloadHMR } from '@payloadcms/next/utilities';

/* Utils */
import ROUTES from '@/lib/utils/routes';
import { getUserFromJWT, SESSION_COOKIE_NAME } from '@/lib/utils/auth';
import { prettyPrint } from '@/lib/utils/dev';

/* Types */
import type { Course } from '@/payload-types';

/* Components */
import Hero from '@/components/Layout/Hero';
import { AcademyNavbar } from '@/components/Layout/Navbar';
import { CourseCards } from '@/components/Course/CourseCards';

async function fetchMyCourses(studentId: string) {
	const payload = await getPayloadHMR({
		config: configPromise,
	});

	const studentData = await payload
		.findByID({
			collection: 'students',
			id: studentId,
			select: {
				id: true,
				courses: true,
			},
		})
		.catch((e) => {
			prettyPrint(e);
		});

	const studentCourses = (studentData?.courses?.filter(Boolean) ?? []) as Course[];

	const pendingPayments = await payload.find({
		collection: 'pending',
		where: {
			and: [
				{
					student: {
						equals: studentId,
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

	return [
		studentCourses?.map((course) => ({ ...course, isPending: false })),
		pendingPayments.docs
			.map((pending) => ({ ...(pending.course as Course), isPending: true }))
			.filter(Boolean),
	].flat();
}

export default async function AcademyMyCoursesPage() {
	const cookieStore = await cookies();

	const user = getUserFromJWT(cookieStore.get(SESSION_COOKIE_NAME)!.value);

	if (!user) {
		return null;
	}

	if (cookieStore.has('vyc-buy-course-redirect')) {
		const redirectSlug = cookieStore.get('vyc-buy-course-redirect')?.value;
		redirect(`${ROUTES.ACADEMY.EXPLORE}/${redirectSlug}/comprar`);
	}

	const courses = await fetchMyCourses(user.id);

	return (
		<>
			<AcademyNavbar userName={user.name} />
			<Hero>
				<div className="container pt-20">
					<h1 className="relative font-display text-4xl font-normal text-white lg:text-8xl">
						Mis Cursos
					</h1>
				</div>
			</Hero>
			<main className="container mt-48 pb-16">
				{courses.length ? (
					<CourseCards courses={courses} isAcademy isOwned />
				) : (
					<div className="flex flex-col items-center justify-center pt-14">
						<h2 className="text-2xl font-bold">Nada por aquí aún</h2>
						<p className="mt-2">
							Explora la{' '}
							<NextLink
								href={ROUTES.ACADEMY.EXPLORE}
								className="font-medium text-cyan-600 hover:text-cyan-500"
							>
								Biblioteca de Cursos
							</NextLink>{' '}
							y comienza tu aventura en el mundo de la narración.
						</p>
					</div>
				)}
			</main>
		</>
	);
}
