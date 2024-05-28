import NextImage from 'next/image';
import NextLink from 'next/link';

/* Assets */
import Logo from '@images/logo.png';

/* Components */
import EnterDashboardButton from './EnterDashboard.client';

export default function DesktopLandingNavbar({
	navItems,
}: {
	navItems: { label: string; href: string }[];
}) {
	return (
		<nav
			className="relative z-10 hidden h-[96px] items-center justify-between lg:flex"
			style={{
				background:
					'linear-gradient(0deg, rgba(248, 253, 253, 0.30) 0%, rgba(248, 253, 253, 0.30) 100%), linear-gradient(103deg, #B6E8E9 11.95%, #EADACA 53.96%, #F6B8B3 97.05%)',
			}}
		>
			<div className="container flex w-full items-center justify-between ">
				<div className="w-1/4">
					<NextImage
						alt="Volver al Inicio"
						className="h-9 w-auto"
						priority
						src={Logo}
					/>
				</div>

				<ul className="mx-8 flex w-full items-center justify-center gap-8 xl:gap-10">
					{navItems.map(({ label, href }) => (
						<li
							key={label}
							className="text-sm font-bold text-gray-900 xl:text-base"
						>
							<NextLink className="hover:text-cyan-800" href={href}>
								{label}
							</NextLink>
						</li>
					))}
				</ul>

				<div className="flex-1">
					<EnterDashboardButton />
				</div>
			</div>
		</nav>
	);
}
