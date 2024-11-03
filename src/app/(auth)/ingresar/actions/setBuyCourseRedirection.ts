'use server';

import { cookies } from 'next/headers';

export async function setBuyCourseRedirection(slug: string) {
	const cookieStore = await cookies();
	cookieStore.set('vyc-buy-course-redirect', slug);
}

export async function unsetBuyCourseRedirection() {
	const cookieStore = await cookies();
	cookieStore.delete('vyc-buy-course-redirect');
}
