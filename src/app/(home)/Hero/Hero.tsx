/* Components */
import MobileHero from '@/app/(home)/Hero/MobileHero';
import DesktopHero from '@/app/(home)/Hero/DesktopHero';

export default function Hero() {
	return (
		<>
			<MobileHero />
			<DesktopHero />
		</>
	);
}
