'use client';

import NextImage from 'next/image';
import { useRouter } from 'next/navigation';

/* Utils */
import Button from '@/components/Button';
// import ROUTES from '@/lib/utils/routes';

/* Hooks */
// import { usePaywallContext } from '@/lib/context/paywall';
import { isSessionValid } from '@/lib/actions/session';

/* Assets */
import MortarboardIcon from '@images/icons/mortarboard.svg';

export default function EnterDashboardButton() {
	/* Hooks */
	const router = useRouter();
	// const { setShouldShowPaywall, setOnSuccessRedirectUrl } = usePaywallContext();

	/* Handlers */
	async function handleClick() {
		const isValid = await isSessionValid();

		// if (isValid) {
		// 	setShouldShowPaywall(false);
		// 	router.push(ROUTES.DASHBOARD);
		// } else {
		// 	setShouldShowPaywall(true);
		// 	setOnSuccessRedirectUrl(ROUTES.DASHBOARD);
		// }
	}

	return (
		<Button
			className="mx-auto flex h-auto items-center gap-2 text-gray-900"
			variant="outline"
			onClick={handleClick}
		>
			Entrar a la escuela
			<NextImage alt="" priority src={MortarboardIcon} />
		</Button>
	);
}
