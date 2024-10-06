/* Components */
import AcademyDesktopNavbar from '@/components/Layout/Navbar/components/DesktopAcademyNavbar';

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

export function AcademyNavbar() {
	return (
		<>
			{/* <MobileNavbar navItems={navItems} /> */}
			<AcademyDesktopNavbar navItems={navItems} />
		</>
	);
}
