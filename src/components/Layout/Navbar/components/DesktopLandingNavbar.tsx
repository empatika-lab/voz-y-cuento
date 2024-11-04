import NextImage from 'next/image';
import NextLink from 'next/link';

/* Assets */
import Logo from '@images/logo.png';
import MortarboardIcon from '@images/icons/mortarboard.svg';

/* Components */
import Button from '@/components/Button';

/* Utils */
import ROUTES from '@/lib/utils/routes';

export default function DesktopLandingNavbar({
	navItems,
}: {
	navItems: { label: string; href: string }[];
}) {
	return (
		<nav
			className="fixed top-0 z-10 hidden h-[96px] w-full items-center justify-between shadow-pink lg:flex"
			style={{
				background:
					'linear-gradient(0deg, rgba(248, 253, 253, 0.30) 0%, rgba(248, 253, 253, 0.30) 100%), linear-gradient(103deg, #B6E8E9 11.95%, #FEF4F4 53.96%, #F9C7CA 97.05%)',
			}}
		>
			<div className="container flex w-full items-center justify-between">
				<div className="w-fit">
					<NextImage alt="Volver al Inicio" className="h-9 w-auto" priority src={Logo} />
				</div>

				<ul className="mx-auto flex flex-1 items-center justify-center gap-8 xl:gap-10">
					{navItems.map(({ label, href }) => (
						<li key={label} className="text-sm font-bold text-gray-900 xl:text-base">
							<NextLink className="hover:text-cyan-800" href={href}>
								{label}
							</NextLink>
						</li>
					))}
				</ul>

				<Button
					variant="outline"
					className="flex w-fit items-center gap-1 font-bold"
					href={ROUTES.LOGIN}
				>
					Ingresar a la Escuela <NextImage alt="Ingresar a la Escuela" src={MortarboardIcon} />
				</Button>
			</div>
		</nav>
	);
}
