/* Components */
import AcademyDesktopNavbar from '@/components/Layout/Navbar/components/DesktopAcademyNavbar';
import MobileAcademyNavbar from './components/MobileAcademyNavbar';

/* Actions */
import { tryLogout } from '@/app/(frontend)/(auth)/actions/tryLogout';

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
	isHidden?: boolean;
}

export function AcademyNavbar({ userName, isHidden }: AcademyNavbarProps) {
	if (isHidden) {
		return null;
	}

	return (
		<>
			<MobileAcademyNavbar navItems={navItems} userName={userName} tryLogout={tryLogout} />
			<AcademyDesktopNavbar navItems={navItems} userName={userName} tryLogout={tryLogout} />
		</>
	);
}
