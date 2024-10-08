'use client';

import NextImage from 'next/image';

/* Components */
// import EnrollButton from './CourseDetailsCard/components/EnrollButton';
import Button from '@/components/Button';

/* Utils */
import { cn } from '@/lib/utils/classNames';
import ROUTES from '@/lib/utils/routes';

/* Actions */
// import handleCourseSubscription from '../actions/handleCourseSubscription.action';

/* Types */
import type { PropsWithClassName, CourseStudentStatus } from '@/lib/types';
import type { Course } from '@/payload/payload-types';
import { usePathname } from 'next/navigation';

interface CourseMobileSubscriptionStickyFooterProps extends PropsWithClassName {
	course: Course;
	courseStudentStatus: CourseStudentStatus;
	userIsAuthenticated: boolean;
}

export default function CourseMobileSubscriptionStickyFooter({
	className,
	course,
	// courseStudentStatus,
	userIsAuthenticated,
}: CourseMobileSubscriptionStickyFooterProps) {
	const pathname = usePathname();
	const ctaText = pathname?.includes('escuela') ? 'Comprar' : 'Inscribirme';

	if (!userIsAuthenticated) {
		return (
			<footer
				className={cn(
					'position shadow-pink fixed bottom-0 left-0 z-10 flex w-full justify-between rounded-t-xl bg-pink-50',
					className,
				)}
			>
				<div className="flex flex-col gap-3 py-3 pl-5 text-right">
					<div className="flex gap-2">
						<strong className="text-xl text-pink-900">ARS ${course.arsPrice}</strong>
						<NextImage
							alt="Bandera Argentina"
							height={16}
							src={'/images/argentina-flag.svg'}
							width={16}
						/>
					</div>
					<div className="flex items-center justify-end gap-2">
						<div className="flex items-center justify-end gap-2">
							<p className="text-sm font-bold">USD ${course.usdPrice}</p>
							<NextImage alt="Bandera Argentina" height={16} src={'/images/globe.svg'} width={16} />
						</div>
					</div>
				</div>
				<div className="flex items-center py-3 pr-5">
					<Button
						className="flex items-center justify-center gap-2 bg-pink-400"
						href={`${ROUTES.LOGIN}?redirect=cursos/${course.slug}`}
					>
						{ctaText}
					</Button>
				</div>
			</footer>
		);
	}

	// return (
	// 	<footer
	// 		className={cn(
	// 			'position shadow-pink fixed bottom-0 left-0 z-10 flex w-full justify-between rounded-t-xl bg-pink-50',
	// 			className,
	// 		)}
	// 	>
	// 		{courseStudentStatus !== 'not-confirmed' && (
	// 			<div className="flex flex-col gap-3 py-3 pl-5 text-right">
	// 				<div className="flex gap-2">
	// 					<strong className="text-xl text-pink-900">ARS ${course.arsPrice}</strong>
	// 					<NextImage
	// 						alt="Bandera Argentina"
	// 						height={16}
	// 						src={'/images/argentina-flag.svg'}
	// 						width={16}
	// 					/>
	// 				</div>
	// 				<div className="flex items-center justify-end gap-2">
	// 					<div className="flex items-center justify-end gap-2">
	// 						<p className="text-sm font-bold">USD ${course.usdPrice}</p>
	// 						<NextImage alt="Bandera Argentina" height={16} src={'/images/globe.svg'} width={16} />
	// 					</div>
	// 				</div>
	// 			</div>
	// 		)}

	// 		{courseStudentStatus === 'unsubscribed' && (
	// 			<div className="flex items-center py-3 pr-5">
	// 				<form action={handleCourseSubscription} className="flex items-center py-3 pr-5">
	// 					<input name="course" type="hidden" value={course.id} />

	// 					<EnrollButton />
	// 				</form>
	// 			</div>
	// 		)}

	// 		{courseStudentStatus === 'confirmed' && (
	// 			<div className="flex items-center py-3 pr-5">
	// 				<Link href={`/escuela/${course.slug}`}>
	// 					<Button>Ir al Curso</Button>
	// 				</Link>
	// 			</div>
	// 		)}

	// 		{courseStudentStatus === 'not-confirmed' && (
	// 			<div className="flex items-center px-5 py-3 text-center">
	// 				Ya compraste a este curso pero no hemos recibido tu comprobante de pago o no lo hemos
	// 				procesado aún.
	// 			</div>
	// 		)}
	// 	</footer>
}
