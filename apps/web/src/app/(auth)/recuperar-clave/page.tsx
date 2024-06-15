'use client';

import NextImage from 'next/image';

/* Assets */
import Logo from '@images/logo.png';
import ResetPasswordInitialStep from './ResetPasswordInitialStep';
import ResetPasswordCreateNewPassword from './ResetPasswordCreateNewPassword';

export type RecoverPasswordSteps =
	| 'initial'
	| 'check-inbox'
	| 'new-password'
	| 'success';

export default function RecoverPassword({
	searchParams,
}: {
	searchParams?: Record<string, string>;
}) {
	/* Helpers */
	function getCurrentStep(): RecoverPasswordSteps {
		if (!searchParams?.step) {
			return 'initial';
		}

		if (
			searchParams.step === 'check-inbox' ||
			searchParams.step === 'new-password'
		) {
			return searchParams.step;
		}

		return 'initial';
	}

	const currentStep = getCurrentStep();

	return (
		<article className="mx-auto flex h-screen max-w-sm flex-col items-center justify-center bg-cyan-50">
			<NextImage
				alt="Logo de Voz y Cuento"
				className="mx-auto mb-10 h-[48px] w-[140px] rounded-2xl"
				priority
				src={Logo}
			/>

			<h1 className="mx-auto mt-8 text-center text-2xl font-bold">
				Recupera tu contraseña
			</h1>

			{currentStep === 'initial' && <ResetPasswordInitialStep />}
			{currentStep === 'new-password' &&
				searchParams?.code &&
				searchParams?.email && (
					<ResetPasswordCreateNewPassword
						code={searchParams.code}
						email={searchParams.email}
					/>
				)}
		</article>
	);
}
