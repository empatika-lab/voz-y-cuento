'use client';

import NextImage from 'next/image';

/* Utils */
import Button from '@/components/Button';
import ROUTES from '@/lib/utils/routes';
import { isSessionValid } from '@/lib/actions/session';

/* Assets */
import MortarboardIcon from '@images/icons/mortarboard.svg';
import { usePaywallContext } from '@/lib/context/paywall';
import { useRouter } from 'next/navigation';

export default function EnterDashboardButton() {
	/* Hooks */
	const router = useRouter();
	const { setShouldShowPaywall } = usePaywallContext();
	async function handleClick() {
		const isValid = await isSessionValid();

		if (isValid) {
			setShouldShowPaywall(false);
			router.push(ROUTES.DASHBOARD);
		} else {
			setShouldShowPaywall(true);
		}
	}

	return (
		<Button
			className="mx-auto flex h-auto items-center gap-2 text-gray-900"
			variant="outline"
			onClick={handleClick}
		>
			Entrar a la escuela
			<NextImage alt="" priority src={MortarboardIcon as string} />
		</Button>
	);
}
