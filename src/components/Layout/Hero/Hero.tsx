import NextImage from 'next/image';

/* Types */
import type { PropsWithClassName } from '@/lib/types';

type Hero = PropsWithClassName;

export default function Hero({ children, className }: PropsWithClassName) {
	return (
		<header className={className}>
			{/* Mobile Path */}
			<NextImage
				alt=""
				aria-hidden
				className="absolute left-0 top-0 h-[220px] w-full lg:hidden"
				height={540}
				priority
				src="/images/mobile-header-path.png"
				width={320}
			/>
			{/* Desktop Path */}
			<NextImage
				alt=""
				aria-hidden
				className="absolute left-0 top-0 h-[220px] w-full lg:block lg:h-[330px]"
				height={330}
				priority
				src="/images/desktop-header-path.png"
				width={1440}
			/>

			{children}
		</header>
	);
}
