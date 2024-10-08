/* Components */
import Breadcrumbs from '@/components/Breadcrumbs';
import CourseLongDescription from './CourseLongDescription';
import CourseMobileFeatures from './CourseMobileFeatures';
import CourseContentAccordion from './CourseContentAccordion';
import CourseSyllabus from './CourseSyllabus';
import BeAPartSection from './BeAPartSectionMobile';
// import CourseMobileSubscriptionStickyFooter from '@/app/cursos/[slug]/components/CourseMobileSubscriptionStickyFooter';

/* Types */
import type { Course } from '@/payload/payload-types';
import type { CourseStudentStatus } from '@/lib/types/student';
import CourseMobileSubscriptionStickyFooter from './CourseMobileSubscriptionStickyFooter';

interface CourseMobileViewProps {
	breacrumbItems: {
		text: string;
		href: string;
	}[];
	course: Course;
	courseStudentStatus: CourseStudentStatus;
	features: {
		id: number;
		label: string;
		icon: string;
	}[];
	userIsAuthenticated: boolean;
	isAcademy?: boolean;
}

export default function CourseMobileView({
	breacrumbItems,
	course,
	features,
	userIsAuthenticated = false,
	courseStudentStatus = 'unsubscribed',
	isAcademy = false,
}: CourseMobileViewProps) {
	return (
		<div className="lg:hidden">
			<div className="px-5 py-[132px]">
				<Breadcrumbs items={breacrumbItems} isAcademy={isAcademy} />

				{/* Descripción del curso */}
				<CourseLongDescription description={course.longDescription} />

				{/* Bloques de características de los cursos */}
				{<CourseMobileFeatures features={features} />}

				{/* Separador */}
				<div className="mt-16 h-[1px] w-full bg-[#0C0E0E]" />

				{/* Temario del curso */}
				{<CourseSyllabus syllabus={course.syllabus} />}

				{/* Separador */}
				<div className="mt-16 h-[1px] w-full bg-[#0C0E0E]" />

				{/* Bloques de contenido del curso */}
				<CourseContentAccordion />
			</div>

			{/* Sección Sé Parte */}
			<BeAPartSection />

			{/* Footer Sticky con Precio del Curso */}
			<CourseMobileSubscriptionStickyFooter
				course={course}
				courseStudentStatus={courseStudentStatus}
				userIsAuthenticated={userIsAuthenticated}
			/>
		</div>
	);
}
