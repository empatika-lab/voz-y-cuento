import { cookies } from 'next/headers';

/* Utils */
import { getUserFromJWT, SESSION_COOKIE_NAME } from '@/lib/utils/auth';

/* Components */
import { AcademyNavbar } from '@/components/Layout/Navbar';

export default async function AcademyPage() {
	const cookieStore = await cookies();

	const user = getUserFromJWT(cookieStore.get(SESSION_COOKIE_NAME)!.value);

	if (!user) return null;

	return <AcademyNavbar userName={user.name} />;
}
