'use client';

import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface PaywallContextType {
	shouldShowPaywall: boolean;
	setShouldShowPaywall: (value: boolean) => void;
}

const defaultValue: PaywallContextType = {
	shouldShowPaywall: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setShouldShowPaywall: () => {},
};

const PaywallContext = createContext<PaywallContextType>(defaultValue);

export const usePaywallContext = () => useContext(PaywallContext);

export const PaywallProvider = ({ children }: PropsWithChildren) => {
	const [shouldShowPaywall, setShouldShowPaywall] = useState<boolean>(
		defaultValue.shouldShowPaywall
	);

	const contextValue: PaywallContextType = {
		shouldShowPaywall,
		setShouldShowPaywall,
	};

	return (
		<PaywallContext.Provider value={contextValue}>
			{children}
		</PaywallContext.Provider>
	);
};
