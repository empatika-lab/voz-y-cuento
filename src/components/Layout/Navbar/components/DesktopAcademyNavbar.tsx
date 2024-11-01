// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import NextImage from 'next/image';
// import NextLink from 'next/link';

// /* Assets */
// import Logo from '@images/logo.png';
// import UserAvatar from '@images/icons/user.svg';
// import ChevronDownIcon from '@images/icons/chevron-down.svg';

// export default function DesktopAcademyNavbar({
// 	navItems,
// 	userName,
// 	tryLogout,
// }: {
// 	navItems: { label: string; href: string }[];
// 	userName: string;
// 	tryLogout: () => Promise<void>;
// }) {
// 	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// 	/* Refs */
// 	const dropdownRef = useRef<HTMLDivElement>(null);

// 	/* Handlers */
// 	async function handleLogout() {
// 		await tryLogout();
// 	}

// 	function toggleDropdown() {
// 		setIsDropdownOpen(!isDropdownOpen);
// 	}

// 	/* Effects */
// 	useEffect(() => {
// 		const handleClickOutside = (event: MouseEvent) => {
// 			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// 				setIsDropdownOpen(false);
// 			}
// 		};

// 		document.addEventListener('mousedown', handleClickOutside);

// 		return () => {
// 			document.removeEventListener('mousedown', handleClickOutside);
// 		};
// 	}, []);

// 	return (
// 		<nav className="relative z-10 hidden h-[96px] items-center justify-between lg:flex bg-cyan-50">
// 			<div className="container flex w-full items-center justify-between ">
// 				<NextImage alt="Volver al Inicio" className="h-9 w-auto" priority src={Logo} />

// 				<ul className="mx-8 flex w-full items-center justify-center gap-8 xl:gap-10">
// 					{navItems.map(({ label, href }) => (
// 						<li key={label} className="text-sm font-bold text-gray-900 xl:text-base">
// 							<NextLink className="hover:text-cyan-800" href={href}>
// 								{label}
// 							</NextLink>
// 						</li>
// 					))}
// 				</ul>

// 				<div className="flex-1 min-w-fit flex items-center gap-3 relative" ref={dropdownRef}>
// 					<div className="flex items-center gap-3 cursor-pointer" onClick={toggleDropdown}>
// 						<NextImage alt="Tu Avatar" src={UserAvatar} />
// 						<p>{userName}</p>
// 						<NextImage alt="Menú de opciones" src={ChevronDownIcon} />
// 					</div>
// 					{isDropdownOpen && (
// 						<div className="absolute right-0 top-full mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
// 							<div
// 								className="py-1"
// 								role="menu"
// 								aria-orientation="vertical"
// 								aria-labelledby="options-menu"
// 							>
// 								<button
// 									onClick={handleLogout}
// 									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
// 									role="menuitem"
// 								>
// 									Cerrar sesión
// 								</button>
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 		</nav>
// 	);
// }
