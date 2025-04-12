/* Types */
import type { Course } from '@/payload-types';

/* Components */
import Breadcrumbs from '@/components/Breadcrumbs';
import CourseLongDescription from './CourseLongDescription';
import CourseMobileFeatures from './CourseMobileFeatures';
import CourseContentAccordion from './CourseContentAccordion';
import CourseSyllabus from './CourseSyllabus';
import BeAPartSection from './BeAPartSectionMobile';
import CourseMobileSubscriptionStickyFooter from './CourseMobileSubscriptionStickyFooter';

interface CourseMobileViewProps {
	breacrumbItems: {
		text: string;
		href: string;
	}[];
	course: Course;
	features: {
		id: number;
		label: string;
		icon: string;
	}[];
	isAcademy?: boolean;
	tryAddPendingPayment?: (studentId: number, courseId: number) => Promise<boolean>;
	studentId?: number;
}

export default function CourseMobileView({
	breacrumbItems,
	course,
	features,
	isAcademy = false,
	tryAddPendingPayment,
	studentId,
}: CourseMobileViewProps) {
	return (
		<div className="lg:hidden">
			<div className="px-5 py-[132px]">
				<Breadcrumbs items={breacrumbItems} isAcademy={isAcademy} />

				{/* Descripción del curso */}
				{course.longDescription && <CourseLongDescription description={course.longDescription} />}

				{/* Bloques de características de los cursos */}
				{<CourseMobileFeatures features={features} />}

				{/* Separador */}
				<div className="mt-16 h-[1px] w-full bg-[#0C0E0E]" />

				{/* Temario del curso */}
				{<CourseSyllabus syllabus={course.syllabus} />}

				{/* Separador */}
				<div className="mt-16 h-[1px] w-full bg-[#0C0E0E]" />

				{/* Bloques de contenido del curso */}
				{course.category !== 'Laboratorio' && (
					<CourseContentAccordion blocks={course.blocks} courseCategory={course.category} />
				)}
			</div>

			{/* Sección Sé Parte */}
			<BeAPartSection />

			{/* Footer Sticky con Precio del Curso */}
			<CourseMobileSubscriptionStickyFooter
				course={course}
				tryAddPendingPayment={tryAddPendingPayment}
				studentId={studentId}
			/>
		</div>
	);
}
