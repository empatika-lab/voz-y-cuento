import Image from 'next/image';

/* Types */
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import type { StaticImageData } from 'next/image';

/* Utils */
import { cn } from '@/lib/utils/classNames';

export interface BenefitsCardProps
	extends PropsWithChildren,
		ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
	description: string;
	className?: string;
	icon: string | StaticImageData;
}

function BenefitsCard({ className, title, description, icon }: BenefitsCardProps) {
	return (
		<li
			className={cn(
				'relative h-fit min-w-[259px] snap-center rounded-2xl bg-white px-2 py-8 shadow-lg lg:pb-8 lg:pt-14',
				className,
			)}
		>
			{/* Icon */}
			<div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cyan-100">
				<Image alt="Icono" className="h-auto w-12 lg:h-[76px] lg:w-[76px]" src={icon} />
			</div>

			{/* Card body */}
			<strong className="block text-center text-xl font-semibold uppercase lg:text-2xl">
				{title}
			</strong>
			<p className="mt-7 text-center text-base font-medium lg:text-xl">{description}</p>
		</li>
	);
}

export default BenefitsCard;
