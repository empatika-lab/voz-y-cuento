/* Components */
import { LandingNavbar } from '@/components/Layout/Navbar';
import Hero from '@/components/Layout/Hero';
import Footer from '@/components/Layout/Footer';
import MyHistoryMobile from './components/MyHistoryMobile';
import MyHistoryDesktop from './components/MyHistoryDesktop';

const breadcrumbItems = [
	{
		text: 'Mi Historia',
		href: '/mi-historia',
	},
];

export default function MyHistory() {
	return (
		<>
			<LandingNavbar />
			<Hero>
				<div className="container pt-20 lg:pt-[148px]">
					<h1 className="font-display relative text-4xl font-normal text-white lg:text-8xl">
						Te cuento mi camino
					</h1>
				</div>
			</Hero>

			<MyHistoryMobile breadcrumbItems={breadcrumbItems} />
			<MyHistoryDesktop breadcrumbItems={breadcrumbItems} />

			<Footer />
		</>
	);
}
