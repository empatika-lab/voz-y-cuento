import { use } from 'react';

import NextImage from 'next/image';

/* Assets */
import Logo from '@images/logo.png';

/* Components */
import ResetPasswordInitialStep from './components/ResetPasswordInitialStep';
import ResetPasswordCreateNewPassword from './components/ResetPasswordCreateNewPassword';

export type RecoverPasswordSteps = 'initial' | 'check-inbox' | 'new-password' | 'success';

export default function RecoverPassword({
	searchParams,
}: {
	searchParams: Promise<{ step?: string; code?: string; email: string }>;
}) {
	const { step, code, email } = use(searchParams);

	/* Helpers */
	function getCurrentStep(): RecoverPasswordSteps {
		if (!step) {
			return 'initial';
		}

		if (step === 'check-inbox' || step === 'new-password') {
			return step;
		}

		return 'initial';
	}

	const currentStep = getCurrentStep();

	return (
		<article className="container mx-auto flex h-screen max-w-sm flex-col items-center justify-center bg-cyan-50">
			<NextImage
				alt="Logo de Voz y Cuento"
				className="mx-auto mb-10 h-[48px] w-[140px] rounded-2xl"
				priority
				src={Logo}
			/>

			<h1 className="mx-auto mt-8 text-center text-2xl font-bold">Recupera tu contraseña</h1>

			{currentStep === 'initial' && <ResetPasswordInitialStep />}

			{currentStep === 'new-password' && code && email && (
				<ResetPasswordCreateNewPassword code={code} email={email} />
			)}
		</article>
	);
}
