'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/* Assets */
import Logo from '@images/logo.png';
import LogoInWhite from '@images/logo-white.png';
import BurgerOpenIcon from '@images/icons/burger-open.svg';
import BurgerCloseIcon from '@images/icons/burger-close.svg';
import MortarboardIcon from '@images/icons/mortarboard.svg';

/* Utils */
import { cn } from '@lib/utils/classNames';
import ROUTES from '@/lib/utils/routes';

/* Components */
import Button from '@/components/Button';

export default function MobileLandingNavbar({
	navItems,
}: {
	navItems: { label: string; href: string }[];
}) {
	const [isOpen, setIsOpen] = useState(false);

	/* Hooks */
	const path = usePathname();

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
					path === '/'
						? 'linear-gradient(0deg, rgba(248, 253, 253, 0.30) 0%, rgba(248, 253, 253, 0.30) 100%), linear-gradient(103deg, #B6E8E9 11.95%, #FEF4F4 53.96%, #F9C7CA 97.05%)'
						: '#0f8183',
			}}
		>
			<div className="container flex items-center justify-between">
				<Link href={path.includes('escuela') ? ROUTES.ACADEMY.MY_COURSES : ROUTES.HOME}>
					{path === '/' ? (
						<NextImage alt="Volver al Inicio" className="h-9 w-auto" priority src={Logo} />
					) : (
						<NextImage
							alt="Volver al Inicio"
							className="relative z-20 h-9 w-auto"
							priority
							src={LogoInWhite}
						/>
					)}
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

				{isOpen && (
					<Button
						variant="outline"
						className="absolute bottom-12 flex w-fit items-center gap-1 font-bold"
						href={ROUTES.LOGIN}
					>
						Ingresar a la Escuela <NextImage alt="Ingresar a la Escuela" src={MortarboardIcon} />
					</Button>
				)}
			</ul>
		</nav>
	);
}
