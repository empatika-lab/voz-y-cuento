'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const spinnerOptions = {
	showSpinner: false,
};

export default function ProgressBarProvider({ children }: { children: React.ReactNode }) {
	return (
		<>
			{children}
			<ProgressBar height="4px" color="#0c6465" options={spinnerOptions} shallowRouting />
		</>
	);
}
