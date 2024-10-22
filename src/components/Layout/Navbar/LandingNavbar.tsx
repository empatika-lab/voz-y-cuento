/* Components */
import MobileNavbar from '@/components/Layout/Navbar/components/MobileLandingNavbar';
import DesktopNavbar from '@/components/Layout/Navbar/components/DesktopLandingNavbar';

/* Utils */
import ROUTES from '@/lib/utils/routes';

export const navItems = [
	{
		label: 'Inicio',
		href: '/',
	},
	{
		label: 'Cursos',
		href: ROUTES.EXPLORE,
	},
	{
		label: 'Mi historia',
		href: ROUTES.ABOUT,
	},
	{
		label: 'Espectáculos',
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
