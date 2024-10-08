/* Components */
import Breadcrumbs from '@/components/Breadcrumbs';
import CourseLongDescription from './CourseLongDescription';
import CourseContentAccordeon from './CourseContentAccordion';
import CourseSyllbus from './CourseSyllabus';
import CourseDesktopDetailsCard from './CourseDesktopDetailsCard';
import BeAPartSectionDesktop from './BeAPartSectionDesktop';

/* Types */
import type { Course } from '@/payload/payload-types';
import type { CourseStudentStatus } from '@/lib/types';

interface CourseDesktopViewProps {
	breacrumbItems: {
		text: string;
		href: string;
	}[];
	course: Course;
	features: { id: number; label: string; icon: string }[];
	courseStudentStatus: CourseStudentStatus;
	userIsAuthenticated: boolean;
	isAcademy?: boolean;
}

export default function CourseDesktopView({
	breacrumbItems,
	course,
	features,
	userIsAuthenticated,
	courseStudentStatus,
	isAcademy = false,
}: CourseDesktopViewProps) {
	return (
		<>
			<div className="container hidden py-20 lg:block lg:py-32">
				<Breadcrumbs items={breacrumbItems} isAcademy={isAcademy} />

				<div className="flex justify-between">
					<div className="w-[60%]" id="course-detail-left-col">
						{/* Descripción del curso */}
						<CourseLongDescription description={course.longDescription} />

						{/* Separador */}
						<div className="mt-16 h-[1px] w-full bg-[#0C0E0E]" />

						{/* Temario del curso */}
						<CourseSyllbus syllabus={course.syllabus} />

						{/* Separador */}
						<div className="mt-16 h-[1px] w-full bg-[#0C0E0E]" />

						{/* Bloques de contenido del curso */}
						<CourseContentAccordeon />
					</div>

					{/* Tarjeta del curso */}
					<div className="w-[360px]" id="course-detail-right-col ">
						<CourseDesktopDetailsCard
							course={course}
							courseStudentStatus={courseStudentStatus}
							features={features}
							userIsAuthenticated={userIsAuthenticated}
						/>
					</div>
				</div>
			</div>

			{/* Sección Sé parte */}
			<BeAPartSectionDesktop />
		</>
	);
}
