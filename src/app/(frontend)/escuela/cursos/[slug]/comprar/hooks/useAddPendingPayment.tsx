'use client';

import { useEffect, useRef } from 'react';

/* Actions */
import { unsetBuyCourseRedirection } from '@/app/(frontend)/(auth)/ingresar/actions/setBuyCourseRedirection';
import tryAddPendingPayment from '../actions/tryAddPendingPayment';

interface Props {
	courseId: number;
	studentId: number;
}

export default function useAddPendingPayment({ courseId, studentId }: Props) {
	const hasRun = useRef(false);

	useEffect(() => {
		if (hasRun.current) return;

		void (async () => {
			const success = await tryAddPendingPayment(studentId, courseId);
			if (success) {
				await unsetBuyCourseRedirection();
			}
		})();

		hasRun.current = true;
	}, [courseId, studentId]);

	return <></>;
}
