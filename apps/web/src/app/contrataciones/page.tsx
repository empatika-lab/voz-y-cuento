/* Components */
import Footer from '@/components/Layout/Footer';
import Hero from '@/components/Layout/Hero';
import { LandingNavbar } from '@/components/Layout/Navbar';

// const breadcrumbItems = [
// 	{
// 		text: 'Contrataciones',
// 		href: '/contrataciones',
// 	},
// ];

export default function MyHistory() {
	return (
		<>
			<LandingNavbar />
			<Hero>
				<div className="container pt-20">
					<h1 className="font-display relative text-4xl font-normal text-white lg:text-8xl">
						Espectáculos y talleres itinerantes
					</h1>
				</div>
			</Hero>
			<Footer />
		</>
	);
}
