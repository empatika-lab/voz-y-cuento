/* Components */
import AcademyDesktopNavbar from '@/components/Layout/Navbar/components/DesktopAcademyNavbar';

/* Actions */
import { tryLogout } from '@/app/(auth)/actions/tryLogout';
/* Utils */
import ROUTES from '@/lib/utils/routes';

export const navItems = [
	{
		label: 'Explorar',
		href: ROUTES.ACADEMY.EXPLORE,
	},
	{
		label: 'Mis cursos',
		href: ROUTES.ACADEMY.MY_COURSES,
	},
];

interface AcademyNavbarProps {
	userName: string;
}

export function AcademyNavbar({ userName }: AcademyNavbarProps) {
	return (
		<>
			{/* <MobileNavbar navItems={navItems} /> */}
			<AcademyDesktopNavbar navItems={navItems} userName={userName} tryLogout={tryLogout} />
		</>
	);
}
