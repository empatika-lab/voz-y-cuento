'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/* Components */
import { AcademyNavbar } from '@/components/Layout/Navbar';

/* Utils */
import ROUTES from '@/lib/utils/routes';
import { getUserFromJWT, SESSION_COOKIE_NAME } from '@/lib/utils/auth';

export default async function AcademyMyCoursesPage() {
	const cookieStore = await cookies();

	const user = getUserFromJWT(cookieStore.get(SESSION_COOKIE_NAME)!.value);

	if (!user) return null;

	if (cookieStore.has('vyc-buy-course-redirect')) {
		const redirectSlug = cookieStore.get('vyc-buy-course-redirect')?.value;
		redirect(`${ROUTES.ACADEMY.EXPLORE}/${redirectSlug}/comprar`);
	}

	return <AcademyNavbar userName={user.name} />;
}
