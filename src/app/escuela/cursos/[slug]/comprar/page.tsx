import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';

/* Utils */
import { prettyPrint } from '@/lib/utils/dev';
import { getCachedPayload } from '@/lib/utils/localApi';
import { getUserFromJWT, SESSION_COOKIE_NAME } from '@/lib/utils/auth';

/* Components */
import { AcademyNavbar } from '@/components/Layout/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Layout/Footer';
import BuyCourseCard from './components/BuyCourseCard';
import PaymentMethods from './components/PaymentMethods';
import BuyCourseInstruction from './components/BuyCourseInstructions';
import BuyCourseEffects from './components/BuyCourseAddPendingPayment';

interface BuyCoursePageProps {
	params: Promise<{
		slug: string;
	}>;
}

async function fetchCourse(slug: string) {
	try {
		const payload = await getPayloadHMR({
			config: configPromise,
		});
		const cachedPayload = getCachedPayload(payload);

		const course = await cachedPayload
			.findOne({
				collection: 'courses',
				field: 'slug',
				value: slug,
			})
			.catch((e) => {
				prettyPrint(e);
				return null;
			});

		return course;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Error inesperado al traer datos del curso.', error);
		return null;
	}
}

export default async function BuyCoursePage({ params }: BuyCoursePageProps) {
	const slug = (await params).slug;

	if (!slug) {
		return notFound();
	}

	const course = await fetchCourse(slug);

	if (!course) {
		notFound();
	}

	const cookieStore = await cookies();

	const user = getUserFromJWT(cookieStore.get(SESSION_COOKIE_NAME)!.value);

	/* Derived State */
	const breadcrumbItems = [
		{
			text: 'Cursos',
			href: '/cursos',
		},
		{
			text: course.name,
			href: course.slug!,
		},
	];

	return (
		<>
			<AcademyNavbar userName={user?.name} />
			<main className="container py-20">
				<Breadcrumbs items={breadcrumbItems} isAcademy />
				<BuyCourseCard course={course} />
				<PaymentMethods />
				<BuyCourseInstruction />
				<BuyCourseEffects courseId={course.id} studentId={parseInt(user.id, 10)} />
			</main>
			<Footer />
		</>
	);
}
