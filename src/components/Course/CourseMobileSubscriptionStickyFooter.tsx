'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

/* Components */
import Button from '@/components/Button';

/* Utils */
import { cn } from '@/lib/utils/classNames';
import ROUTES from '@/lib/utils/routes';

/* Actions */
import { setBuyCourseRedirection } from '@/app/(auth)/ingresar/actions/setBuyCourseRedirection';

/* Types */
import type { PropsWithClassName } from '@/lib/types';
import type { Course } from '@/payload-types';

interface CourseMobileSubscriptionStickyFooterProps extends PropsWithClassName {
	course: Course;
	tryAddPendingPayment?: (studentId: number, courseId: number) => Promise<boolean>;
	studentId?: number;
}

export default function CourseMobileSubscriptionStickyFooter({
	className,
	course,
	tryAddPendingPayment,
	studentId,
}: CourseMobileSubscriptionStickyFooterProps) {
	const [isPendingPayment, setIsPendingPayment] = useState(false);

	/* Hooks */
	const router = useRouter();
	const pathname = usePathname();
	const ctaText = pathname?.includes('escuela') ? 'Comprar' : 'Inscribirme';
	const ctLink = pathname?.includes('escuela')
		? `/escuela/cursos/${course.slug}/comprar`
		: `${ROUTES.LOGIN}`;

	return (
		<footer
			className={cn(
				'position fixed bottom-0 left-0 z-10 flex w-full justify-between rounded-t-xl bg-pink-50 shadow-pink',
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

			{tryAddPendingPayment ? (
				<form className="flex items-center justify-center pr-5">
					<Button
						className="flex items-center justify-center gap-2 bg-pink-400"
						disabled={isPendingPayment}
						type="submit"
						onClick={async () => {
							if (course.slug) {
								if (studentId && tryAddPendingPayment) {
									setIsPendingPayment(true);
									const success = await tryAddPendingPayment(studentId, course.id);
									if (success) {
										await setBuyCourseRedirection(course.slug);
										router.push(ctLink);
										setIsPendingPayment(false);
										return;
									}
									return;
								}
							}
						}}
					>
						{isPendingPayment ? 'Enviando...' : ctaText}
					</Button>
				</form>
			) : (
				<div className="flex items-center py-3 pr-5">
					<Button
						className="bg-pink-400 text-center"
						href={ROUTES.LOGIN}
						onClick={() => {
							if (course.slug) {
								void setBuyCourseRedirection(course.slug);
							}
							router.push(ctLink);
						}}
					>
						{ctaText}
					</Button>
				</div>
			)}
		</footer>
	);
}
