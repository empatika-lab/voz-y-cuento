/* Components */
import AcademyDesktopNavbar from '@/components/Layout/Navbar/components/DesktopAcademyNavbar';
import MobileAcademyNavbar from './components/MobileAcademyNavbar';

/* Actions */
import { tryLogout } from '@/app/(auth)/actions/tryLogout';

/* Utils */
import ROUTES from '@/lib/utils/routes';

export const navItems = [
	{
		label: 'Mis cursos',
		href: ROUTES.ACADEMY.MY_COURSES,
	},
	{
		label: 'Explorar',
		href: ROUTES.ACADEMY.EXPLORE,
	},
];

interface AcademyNavbarProps {
	userName: string;
}

export function AcademyNavbar({ userName }: AcademyNavbarProps) {
	return (
		<>
			<MobileAcademyNavbar navItems={navItems} userName={userName} tryLogout={tryLogout} />
			<AcademyDesktopNavbar navItems={navItems} userName={userName} tryLogout={tryLogout} />
		</>
	);
}
