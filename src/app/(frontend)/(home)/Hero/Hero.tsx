/* Components */
import MobileHero from '@/app/(frontend)/(home)/Hero/MobileHero';
import DesktopHero from '@/app/(frontend)/(home)/Hero/DesktopHero';

export default function Hero() {
	return (
		<>
			<MobileHero />
			<DesktopHero />
		</>
	);
}
