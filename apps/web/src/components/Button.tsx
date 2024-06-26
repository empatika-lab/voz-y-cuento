import { ButtonHTMLAttributes } from 'react';
import NextLink, { LinkProps } from 'next/link';
import { tv, VariantProps } from 'tailwind-variants';

/* Utils */
import { cn } from '@frontend/lib/utils/classNames';

/* Types */
import { PropsWithClassName } from '@frontend/lib/types';

const button = tv({
	base: [
		'rounded-xl',
		'border-2',
		'shadow-3xl',
		'hover:shadow-none',
		'transition-border duration-200 ease-out',
		'border-grey-900',
		'text-grey-950',
		'font-bold',
		'leading-6',
		'disabled:opacity-30',
		'disabled:pointer-events-none',
		'px-3 py-2 min-w-[139px] text-base',
		'lg:px-8  lg:min-w-[288px] lg:py-3 lg:text-[20px]',
	],
	variants: {
		color: {
			primary: 'bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-600',
			secondary: 'bg-pink-400 hover:bg-pink-500 active:bg-pink-600',
		},
		variant: {
			fill: '',
			outline: 'bg-transparent hover:bg-transparent active:bg-transparent',
			ghost:
				'bg-transparent border-0 shadow-none hover:bg-cyan-100 active:bg-cyan-200 hover:shadow-3xl',
		},
	},
});

type ButtonVariants = VariantProps<typeof button>;

export type ButtonProps = PropsWithClassName &
	ButtonVariants &
	(ButtonHTMLAttributes<HTMLButtonElement> | LinkProps);

export default function Button({
	children,
	className,
	color = 'primary',
	variant = 'fill',
	...props
}: ButtonProps) {
	if ('href' in props) {
		return (
			<NextLink
				className={cn([button({ color, variant }), className])}
				{...props}
				href={(props as LinkProps).href}
			>
				{children}
			</NextLink>
		);
	}

	return (
		<button className={cn([button({ color, variant })], className)} {...props}>
			{children}
		</button>
	);
}
