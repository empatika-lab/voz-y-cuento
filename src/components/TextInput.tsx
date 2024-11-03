/* Types */
import type { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';

/* Utils */
import { cn } from '@lib/utils/classNames';

interface TextInputProps
	extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	isFullWidth?: boolean;
	label: string;
	name: string;
	errorMessage?: string;
	className?: string;
	Icon?: ReactNode;
}

export default function TextInput({
	isFullWidth = true,
	label,
	name,
	errorMessage,
	Icon,
	className,
	ref,
	...restProps
}: TextInputProps) {
	return (
		<div className={cn(isFullWidth ? 'w-full' : 'w-auto', 'relative', className)}>
			<span className="absolute right-4 top-[28px] -translate-y-1/2">{Icon && Icon}</span>
			<input
				ref={ref}
				className="peer h-14 w-full border-b-2 border-gray-300 bg-transparent pt-4 align-text-bottom text-gray-950 transition-all delay-500 duration-100 ease-out placeholder:text-transparent focus:border-gray-950 focus:outline-none peer-placeholder-shown:text-base peer-placeholder-shown:text-[#768989] peer-focus:text-sm peer-focus:text-[#768989]"
				id={name}
				name={name}
				placeholder={label}
				type="text"
				{...restProps}
				autoComplete="new-password"
			/>

			<label
				className="absolute left-0 top-2 -translate-y-1/2 text-sm font-medium text-[#829697] transition-all peer-placeholder-shown:top-[50%] peer-placeholder-shown:text-base peer-placeholder-shown:text-[#5C6B6B] peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#829697]"
				htmlFor={name}
			>
				{label}
			</label>

			<p
				className={cn([
					'mt-2 h-[12px] text-sm font-bold text-red-700',
					errorMessage ? 'visible' : 'hidden',
				])}
			>
				{errorMessage}
			</p>
		</div>
	);
}
