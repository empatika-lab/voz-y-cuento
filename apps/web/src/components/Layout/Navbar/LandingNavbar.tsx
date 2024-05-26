/* Components */
import MobileNavbar from '@frontend/components/Layout/Navbar/components/MobileLandingNavbar';
import DesktopNavbar from '@frontend/components/Layout/Navbar/components/DesktopLandingNavbar';

/* Utils */
import ROUTES from '@/lib/utils/routes';

export const navItems = [
	{
		label: 'Inicio',
		href: '/',
	},
	{
		label: 'Cursos',
		href: ROUTES.DASHBOARD,
	},
	{
		label: 'Mi historia',
		href: ROUTES.ABOUT,
	},
	{
		label: 'Contrataciones',
		href: ROUTES.HIRE,
	},
];

export function LandingNavbar() {
	return (
		<>
			<MobileNavbar navItems={navItems} />
			<DesktopNavbar navItems={navItems} />
		</>
	);
}
