'use client';

import { useEffect, useRef } from 'react';

/* Actions */
import { unsetBuyCourseRedirection } from '@/app/(frontend)/(auth)/ingresar/actions/setBuyCourseRedirection';

export default function ClearRedirectCookie() {
	const hasRun = useRef(false);

	useEffect(() => {
		if (hasRun.current) return;

		void (async () => {
			await unsetBuyCourseRedirection();
		})();

		hasRun.current = true;
	}, []);

	return null;
}
