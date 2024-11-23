import configPromise from '@payload-config';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { getPayload } from 'payload';

/* Utils */
import { prettyPrint } from '@/lib/utils/dev';
import { getUserFromJWT, SESSION_COOKIE_NAME } from '@/lib/utils/auth';

/* Components */
import { AcademyNavbar } from '@/components/Layout/Navbar';
import Hero from '@/components/Layout/Hero';
import Footer from '@/components/Layout/Footer';
import CourseMobileView from '@/components/Course/CourseMobileView';
import CourseDesktopView from '@/components/Course/CourseDesktopView';

/* Actions */
import tryAddPendingPayment from './comprar/actions/tryAddPendingPayment';

const features = [
	{
		id: 1,
		icon: '/images/icons/dialog.svg',
		label: 'Foro de consultas',
	},
	{
		id: 2,
		icon: '/images/icons/box.svg',
		label: 'Recursos literarios',
	},
	{
		id: 3,
		icon: '/images/icons/book.svg',
		label: 'Material de Lectura',
	},
	{
		id: 4,
		icon: '/images/icons/clipboard.svg',
		label: 'Ejercicios de práctica con correcciones y sugerencias.',
	},
	{
		id: 5,
		icon: '/images/icons/certificate.svg',
		label: 'Certificación firmada una vez entregado el proyecto final.',
	},
];

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

		return course?.docs[0];
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Error inesperado al traer datos del curso.', error);
		return null;
	}
}

interface CourseDetailsPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default async function CourseDetailsPage({ params }: CourseDetailsPageProps) {
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
			<AcademyNavbar userName={user.name} />
			<Hero>
				<div className="container pt-24">
					<h1 className="relative font-display text-4xl font-normal text-white lg:text-8xl">
						{course.name.replaceAll('.', '')}
					</h1>
				</div>
			</Hero>
			<main>
				<CourseMobileView
					breacrumbItems={breadcrumbItems}
					course={course}
					features={features}
					isAcademy
					tryAddPendingPayment={tryAddPendingPayment}
					studentId={parseInt(user.id, 10)}
				/>
				<CourseDesktopView
					breacrumbItems={breadcrumbItems}
					course={course}
					features={features}
					isAcademy
					tryAddPendingPayment={tryAddPendingPayment}
					studentId={parseInt(user.id, 10)}
				/>
			</main>
			<Footer className="pb-32" />
		</>
	);
}
