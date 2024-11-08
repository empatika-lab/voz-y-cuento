/* Components */
import Breadcrumbs from '@/components/Breadcrumbs';
import CourseLongDescription from './CourseLongDescription';
import CourseContentAccordeon from './CourseContentAccordion';
import CourseSyllbus from './CourseSyllabus';
import CourseDesktopDetailsCard from './CourseDesktopDetailsCard';
import BeAPartSectionDesktop from './BeAPartSectionDesktop';

/* Types */
import type { Course } from '@/payload-types';

interface CourseDesktopViewProps {
	breacrumbItems: {
		text: string;
		href: string;
	}[];
	course: Course;
	features: { id: number; label: string; icon: string }[];
	isAcademy?: boolean;
	tryAddPendingPayment?: (studentId: number, courseId: number) => Promise<boolean>;
	studentId?: number;
}

export default function CourseDesktopView({
	breacrumbItems,
	course,
	features,
	isAcademy = false,
	tryAddPendingPayment,
	studentId,
}: CourseDesktopViewProps) {
	return (
		<>
			<div className="container hidden py-20 lg:block lg:py-32">
				<Breadcrumbs items={breacrumbItems} isAcademy={isAcademy} />

				<div className="flex justify-between">
					<div className="w-[60%]" id="course-detail-left-col">
						{/* Descripción del curso */}
						<CourseLongDescription description={course.longDescription} />

						{/* Temario del curso */}
						{course.syllabus?.length ? (
							<>
								{/* Separador */}
								<div className="mt-16 h-[1px] w-full bg-[#0C0E0E]" />
								<CourseSyllbus syllabus={course.syllabus} />
							</>
						) : null}

						{/* Bloques de contenido del curso */}
						{course.category !== 'Seminario' && course.category !== 'Laboratorio' && (
							<>
								{/* Separador */}
								<div className="mt-16 h-[1px] w-full bg-[#0C0E0E]" />
								<CourseContentAccordeon blocks={course.blocks} />
							</>
						)}
					</div>

					{/* Tarjeta del curso */}
					<div className="w-[360px]" id="course-detail-right-col ">
						<CourseDesktopDetailsCard
							course={course}
							features={features}
							tryAddPendingPayment={tryAddPendingPayment}
							studentId={studentId}
						/>
					</div>
				</div>
			</div>

			{/* Sección Sé parte */}
			<BeAPartSectionDesktop />
		</>
	);
}
