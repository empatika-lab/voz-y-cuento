'use client';

import { useRef, useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';

/* Assets */
import BurgerOpenIcon from '@images/icons/burger-open.svg';
import BurgerCloseIcon from '@images/icons/burger-close.svg';
import UserAvatar from '@images/icons/user.svg';
import ChevronDownIcon from '@images/icons/chevron-down.svg';
import Logo from '@images/logo.png';

/* Utils */
import { cn } from '@lib/utils/classNames';
import ROUTES from '@/lib/utils/routes';

export default function MobileAcademyNavbar({
	navItems,
	userName,
	tryLogout,
}: {
	navItems: { label: string; href: string }[];
	userName: string;
	tryLogout: () => Promise<void>;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	/* Refs */
	const dropdownRef = useRef<HTMLLIElement>(null);

	/* Handlers */
	async function handleLogout() {
		await tryLogout();
	}

	function toggleDropdown() {
		setIsDropdownOpen(!isDropdownOpen);
	}

	/* Helpers */
	function toggleMenu() {
		setIsOpen((current) => !current);
	}

	return (
		<nav
			className={cn(
				'fixed left-0 top-0 z-20 flex h-[62px] w-full flex-col overflow-hidden py-3 transition-all duration-100 lg:hidden',
				"[&:has(input[type='checkbox']:checked)]:h-screen",
			)}
			style={{
				background:
					'linear-gradient(0deg, rgba(248, 253, 253, 0.30) 0%, rgba(248, 253, 253, 0.30) 100%), linear-gradient(103deg, #B6E8E9 11.95%, #FEF4F4 53.96%, #F9C7CA 97.05%)',
			}}
		>
			<div className="container flex items-center justify-between">
				<Link href={ROUTES.ACADEMY.MY_COURSES}>
					<NextImage alt="Volver al Inicio" className="h-9 w-auto" priority src={Logo} />
				</Link>

				<button
					aria-label={isOpen ? 'Cerrar Menú de Navegación' : 'Abrir Menú de Navegación'}
					className="relative z-40 h-9 w-9"
					onClick={toggleMenu}
					onKeyDown={toggleMenu}
				>
					<input
						className="absolute inset-0 appearance-none"
						type="checkbox"
						aria-label={isOpen ? 'Cerrar menù' : 'Abrir menú'}
					/>
					<NextImage
						alt="Abrir Menú"
						className={cn(
							'pointer-events-none absolute inset-0 opacity-100 transition-all duration-200 ease-in-out',
							{ 'opacity-0': isOpen },
						)}
						src={BurgerOpenIcon}
					/>

					<NextImage
						alt="Cerrar Menú"
						className={cn(
							'pointer-events-none absolute inset-0 opacity-0 transition-all duration-200 ease-in-out',
							{ 'opacity-100': isOpen },
						)}
						src={BurgerCloseIcon}
					/>
				</button>
			</div>

			<ul className="flex flex-col items-center py-12">
				<li className="relative mx-auto flex min-w-fit items-center gap-3" ref={dropdownRef}>
					<div className="flex cursor-pointer items-center gap-3" onClick={toggleDropdown}>
						<NextImage alt="Tu Avatar" src={UserAvatar} />
						<p className="font-bold">{userName}</p>
						<NextImage alt="Menú de opciones" src={ChevronDownIcon} />
					</div>
					{isDropdownOpen && (
						<div className="absolute right-0 top-full mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
							<div
								className="py-1"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="options-menu"
							>
								<button
									onClick={handleLogout}
									className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
									role="menuitem"
								>
									Cerrar sesión
								</button>
							</div>
						</div>
					)}
				</li>

				{navItems.map(({ label, href }) => (
					<li
						key={label}
						className={cn(
							'pt-12 font-bold text-gray-900 opacity-0 transition-opacity duration-500',
							{
								'opacity-100': isOpen,
							},
						)}
					>
						<Link href={href}>{label}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
