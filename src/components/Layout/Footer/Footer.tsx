/* Components */
import FooterAdvert from '@/components/Layout/Footer/components/FooterAdvert';
import FooterSideNav from '@/components/Layout/Footer/components/FooterSiteNav';
import FooterSocial from '@/components/Layout/Footer/components/FooterSocial';

/* Types */
import type { PropsWithClassName } from '@/lib/types';

/* Utils */
import { cn } from '@/lib/utils/classNames';

export default function Footer({ className }: PropsWithClassName) {
	return (
		<footer className={cn('bg-cyan-50 pb-[20px] lg:pb-12', className)}>
			<FooterAdvert />
			<FooterSocial />
			<FooterSideNav />
		</footer>
	);
}
