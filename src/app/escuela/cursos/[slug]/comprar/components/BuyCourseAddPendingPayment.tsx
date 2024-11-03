'use client';

import useAddPendingPayment from '../hooks/useAddPendingPayment';

interface Props {
	courseId: number;
	studentId: number;
}

export default function BuyCourseEffects({ courseId, studentId }: Props) {
	useAddPendingPayment({ courseId, studentId });

	return <></>;
}
