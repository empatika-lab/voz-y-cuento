import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/* Components */
import { AcademyNavbar } from '@/components/Layout/Navbar';

/* Utils */
import { getUserFromJWT, SESSION_COOKIE_NAME } from '@/lib/utils/auth';

export default async function AcademyMyCoursesPage({
	searchParams,
}: {
	searchParams: Promise<{ redirect?: string }>;
}) {
	const cookieStore = await cookies();

	const user = getUserFromJWT(cookieStore.get(SESSION_COOKIE_NAME)!.value);

	if (!user) return null;

	const redirectUrl = (await searchParams)?.redirect;

	if (typeof redirectUrl === 'string') {
		redirect(redirectUrl);
	}

	return <AcademyNavbar userName={user.name} />;
}
