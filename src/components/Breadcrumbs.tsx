import NextLink from 'next/link';
import NextImage from 'next/image';

/* Icons */
import chevronRight from '@images/icons/chevron-right.svg';

/* Utils */
import { cn } from '@/lib/utils/classNames';

interface BreadcrumbsProps {
	items: {
		text: string;
		href: string;
	}[];
	isAcademy?: boolean;
}

export default function Breadcrumbs({ items, isAcademy = false }: BreadcrumbsProps) {
	if (!items.length) {
		return null;
	}

	return (
		<nav className="py-3">
			<ul className="flex gap-1 text-sm lg:text-base">
				<li>
					<NextLink className="font-medium" href="/">
						Inicio
					</NextLink>
				</li>
				<NextImage alt="" height={24} src={chevronRight} width={24} />

				{items.map((item, index, array) => (
					<li key={item.text} className="flex">
						<NextLink
							className={cn('max-w-[200px] font-medium lg:max-w-none', {
								'line-clamp-1': index === array.length - 1,
								'font-bold': index === array.length - 1,
							})}
							href={isAcademy ? `/escuela${item.href}` : item.href}
						>
							<span className="flex-1">{item.text}</span>
						</NextLink>
						{index !== array.length - 1 && (
							<NextImage alt="" height={24} src={chevronRight} width={24} />
						)}
					</li>
				))}
			</ul>
		</nav>
	);
}
