import NextLink from 'next/link';
import NextImage from 'next/image';

/* Icons */
import chevronRight from '@icons/chevron-right.svg';

/* Utils */
import { cn } from '@/lib/utils/classNames';

interface BreadcumbsProps {
	items: {
		text: string;
		href: string;
	}[];
}

export default function Breadcrumbs({ items }: BreadcumbsProps) {
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
					<>
						<li key={item.text} className="flex">
							<NextLink
								className={cn('font-medium', {
									'line-clamp-1': index === array.length - 1,
								})}
								href={item.href}
							>
								{item.text}
							</NextLink>
						</li>
						{index !== array.length - 1 && (
							<NextImage alt="" height={24} src={chevronRight} width={24} />
						)}
					</>
				))}
			</ul>
		</nav>
	);
}
