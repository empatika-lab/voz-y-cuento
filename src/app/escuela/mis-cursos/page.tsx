import { AcademyNavbar } from '@/components/Layout/Navbar';
import { getUserFromJWT, SESSION_COOKIE_NAME } from '@/lib/utils/auth';
import { cookies } from 'next/headers';

export default async function AcademyMyCoursesPage() {
	const cookieStore = await cookies();

	const user = getUserFromJWT(cookieStore.get(SESSION_COOKIE_NAME)!.value);

	if (!user) return null;

	return <AcademyNavbar userName={user.name} />;
}
