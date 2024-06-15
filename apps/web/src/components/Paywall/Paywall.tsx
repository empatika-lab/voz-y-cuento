'use client';

import { useLayoutEffect, useState } from 'react';

/* Hooks */
import { usePaywallContext } from '@/lib/context/paywall';

/* Components */
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

export default function Paywall() {
	const [currentView, setCurrentView] = useState<
		'sign-in' | 'sign-up' | 'reset-password'
	>('sign-in');

	/* Hooks */
	const { shouldShowPaywall, setShouldShowPaywall } = usePaywallContext();

	/* Handlers */
	function switchToSignUp() {
		setCurrentView('sign-up');
	}

	function switchToSignIn() {
		setCurrentView('sign-in');
	}

	/* Effects */
	useLayoutEffect(() => {
		if (shouldShowPaywall) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}, [shouldShowPaywall]);

	if (!shouldShowPaywall) {
		return null;
	}

	return (
		<article className="fixed inset-0 z-20 flex h-full w-full items-center justify-center bg-cyan-900 bg-opacity-90">
			<div className="bg-cyan-25 relative z-20 max-h-[80vh] w-[calc(100%-16px)] overflow-scroll rounded-2xl p-4 py-20 md:w-[432px] lg:px-10">
				<button
					className="absolute right-4 top-1 -m-2 p-2 text-5xl hover:text-gray-600"
					onClick={() => setShouldShowPaywall(false)}
				>
					&times;
				</button>

				{currentView === 'sign-in' ? (
					<SignIn switchToSignUp={switchToSignUp} />
				) : (
					<SignUp switchToSignIn={switchToSignIn} />
				)}
			</div>
		</article>
	);
}
