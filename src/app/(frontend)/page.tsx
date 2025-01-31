/* Components */
import { LandingNavbar } from '@/components/Layout/Navbar';
import Hero from './(home)/Hero';
import Footer from '@/components/Layout/Footer';

/* Sections */
import Benefits from './(home)/Benefits';
import About from './(home)/About';
import Shows from './(home)/Shows';
import OnPremises from './(home)/OnPremises';
import Testimonials from './(home)/Testimonials';

export default function Home() {
	return (
		<>
			<LandingNavbar />
			<main>
				<Hero />
				<Benefits />
				<About />
				<Shows />
				<Testimonials />
				<OnPremises />
			</main>
			<Footer />
		</>
	);
}
