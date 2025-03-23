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
		<li className={cn('relative', className)}>
			{/* Card with shadow */}
			<div className="relative h-[168px] w-[254px] rounded-2xl bg-white px-2 py-8 shadow-[0_0_10px_rgba(0,0,0,0.15)] lg:h-[234px]">
				{/* Card body */}
				<strong className="block text-center text-xl font-semibold uppercase lg:mt-6 lg:text-2xl">
					{title}
				</strong>
				<p className="mt-7 text-balance text-center text-base font-medium lg:text-xl">
					{description}
				</p>

				{/* Icon positioned relative to the card div */}
				<div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cyan-100">
					<Image alt="Icono" className="h-auto w-12 lg:h-[76px] lg:w-[76px]" src={icon} />
				</div>
			</div>
		</li>
	);
}

export default BenefitsCard;
