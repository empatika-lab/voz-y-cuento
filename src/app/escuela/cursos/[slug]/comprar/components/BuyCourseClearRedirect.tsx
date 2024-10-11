'use client';

import { useEffect } from 'react';

/* Actions */
import { unsetBuyCourseRedirection } from '@/app/(auth)/ingresar/actions/setBuyCourseRedirection';

export default function BuyCourseClearRedirect() {
	useEffect(() => {
		void unsetBuyCourseRedirection();
	}, []);

	return <></>;
}
