'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/* Utils */
import { SESSION_COOKIE_NAME } from '@/lib/utils/auth';
import ROUTES from '@/lib/utils/routes';

export async function tryLogout() {
	const cookieManager = await cookies();

	cookieManager.set(SESSION_COOKIE_NAME, '');

	redirect(ROUTES.HOME);
}
