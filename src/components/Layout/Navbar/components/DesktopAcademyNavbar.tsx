import NextImage from 'next/image';
import NextLink from 'next/link';

/* Assets */
import Logo from '@images/logo.png';
import UserAvatar from '@images/icons/user.svg';
import ChevronDownIcon from '@images/icons/chevron-down.svg';

export default function DesktopAcademyNavbar({
	navItems,
	userName,
}: {
	navItems: { label: string; href: string }[];
	userName: string;
}) {
	return (
		<nav className="relative z-10 hidden h-[96px] items-center justify-between lg:flex cursor-pointer">
			<div className="container flex w-full items-center justify-between ">
				<NextImage alt="Volver al Inicio" className="h-9 w-auto" priority src={Logo} />

				<ul className="mx-8 flex w-full items-center justify-center gap-8 xl:gap-10">
					{navItems.map(({ label, href }) => (
						<li key={label} className="text-sm font-bold text-gray-900 xl:text-base">
							<NextLink className="hover:text-cyan-800" href={href}>
								{label}
							</NextLink>
						</li>
					))}
				</ul>

				<div className="flex-1 min-w-fit flex items-center gap-3">
					<NextImage alt="Tu Avatar" src={UserAvatar} />
					<p>{userName}</p>
					<NextImage alt="Menú de opciones" src={ChevronDownIcon} />
				</div>
			</div>
		</nav>
	);
}
