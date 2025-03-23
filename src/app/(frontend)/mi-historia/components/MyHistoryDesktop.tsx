/* Components */
import Breadcrumbs from '@/components/Breadcrumbs';
import MyHistoryText from './MyHistoryText';
import MyHistoryQuote from './MyHistoryQuote';
import MyHistoryDesktopPhotosColumn from './MyHistoryDesktopPhotosColumn';

interface MyHistoryDesktopProps {
	breadcrumbItems: { text: string; href: string }[];
}

export default function MyHistoryDesktop({ breadcrumbItems }: MyHistoryDesktopProps) {
	return (
		<div className="hidden lg:block">
			<header className="container pb-10 pt-48 lg:pt-32">
				<Breadcrumbs items={breadcrumbItems} />
				<h1 className="mt-16 font-display text-5xl">Soy Emilce Brusa</h1>
			</header>

			<div className="container flex h-full justify-between gap-[125px]">
				<MyHistoryText />
				<MyHistoryDesktopPhotosColumn />
			</div>
			<MyHistoryQuote />
		</div>
	);
}
