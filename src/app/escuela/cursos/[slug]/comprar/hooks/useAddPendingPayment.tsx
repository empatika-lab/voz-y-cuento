'use client';

import { useEffect } from 'react';

/* Actions */
import { unsetBuyCourseRedirection } from '@/app/(auth)/ingresar/actions/setBuyCourseRedirection';
import tryAddPendingPayment from '@/app/(auth)/actions/tryAddPendingPayment';

interface Props {
	courseId: number;
	studentId: number;
}

export default function useAddPendingPayment({ courseId, studentId }: Props) {
	useEffect(() => {
		void tryAddPendingPayment(studentId, courseId);
		void unsetBuyCourseRedirection();
	}, [courseId, studentId]);

	return <></>;
}
