import configPromise from '@payload-config';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

/* Components */
import { LandingNavbar } from '@/components/Layout/Navbar/LandingNavbar';
import Hero from '@/components/Layout/Hero';
import Footer from '@/components/Layout/Footer';
import CourseMobileView from '@/components/Course/CourseMobileView';
import CourseDesktopView from '@/components/Course/CourseDesktopView';

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

		const course = await payload.find({
			collection: 'courses',
			where: {
				slug: { equals: slug },
			},
		});

		return course.docs[0];
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
			<LandingNavbar />
			<Hero>
				<div className="container pt-20 lg:pt-[148px]">
					<h1 className="relative font-display text-4xl font-normal text-white lg:text-8xl">
						{course.name.replaceAll('.', '')}
					</h1>
				</div>
			</Hero>
			<main className="pt-8 lg:pt-16">
				<CourseMobileView breacrumbItems={breadcrumbItems} course={course} features={features} />
				<CourseDesktopView breacrumbItems={breadcrumbItems} course={course} features={features} />
			</main>
			<Footer className="pb-32" />
		</>
	);
}
