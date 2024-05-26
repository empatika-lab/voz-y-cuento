/* Components */
import MobileHero from '@frontend/app/(home)/Hero/MobileHero';
import DesktopHero from '@frontend/app/(home)/Hero/DesktopHero';

export default function Hero() {
	return (
		<>
			<MobileHero />
			<DesktopHero />
		</>
	);
}
