/* Components */
import Breadcrumbs from '@/components/Breadcrumbs';
import MyHistoryMobileCarousel from './MyHistoryMobileCarousel';
import MyHistoryText from './MyHistoryText';
import MyHistoryQuote from './MyHistoryQuote';

interface MyHistoryMobileProps {
	breadcrumbItems: { text: string; href: string }[];
}

export default function MyHistoryMobile({ breadcrumbItems }: MyHistoryMobileProps) {
	return (
		<div className="lg:hidden">
			<header className="container pb-10 pt-32">
				<Breadcrumbs items={breadcrumbItems} />
				<h1 className="font-display mt-10 text-4xl">Soy Emilce Brusa</h1>
			</header>

			<MyHistoryMobileCarousel />
			<MyHistoryText />
			<MyHistoryQuote />
		</div>
	);
}
