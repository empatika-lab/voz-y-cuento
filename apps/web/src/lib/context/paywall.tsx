'use client';

import { PropsWithChildren, createContext, useContext, useState } from 'react';

/* Utils */
import ROUTES from '../utils/routes';

interface PaywallContextType {
	shouldShowPaywall: boolean;
	setShouldShowPaywall: (value: boolean) => void;
	onSuccessRedirectUrl: (typeof ROUTES)[keyof typeof ROUTES];
	setOnSuccessRedirectUrl: (url: (typeof ROUTES)[keyof typeof ROUTES]) => void;
}

const defaultValue: PaywallContextType = {
	shouldShowPaywall: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setShouldShowPaywall: () => {},
	onSuccessRedirectUrl: ROUTES.DASHBOARD,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setOnSuccessRedirectUrl: () => {},
};

const PaywallContext = createContext<PaywallContextType>(defaultValue);

export const usePaywallContext = () => useContext(PaywallContext);

export const PaywallProvider = ({ children }: PropsWithChildren) => {
	const [shouldShowPaywall, setShouldShowPaywall] = useState<boolean>(
		defaultValue.shouldShowPaywall
	);
	const [onSuccessRedirectUrl, setOnSuccessRedirectUrl] = useState<
		(typeof ROUTES)[keyof typeof ROUTES]
	>(ROUTES.DASHBOARD);

	const contextValue: PaywallContextType = {
		shouldShowPaywall,
		setShouldShowPaywall,
		onSuccessRedirectUrl,
		setOnSuccessRedirectUrl,
	};

	return (
		<PaywallContext.Provider value={contextValue}>
			{children}
		</PaywallContext.Provider>
	);
};
