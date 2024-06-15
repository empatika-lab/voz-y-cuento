'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

/* Components */
import TextInput from '@/components/TextInput';

/* Server Acions */
import { trySendingPasswordRecoveryEmail } from './ResetPassword.action';

/* Hooks */
import { usePaywallContext } from '@/lib/context/paywall';

/* Components */
import Button from '@/components/Button';

/* Utils */
import { isErrorResponse } from '@/lib/utils/api';
import { cn } from '@/lib/utils/classNames';
import ROUTES from '@/lib/utils/routes';

const validationSchema = z.object({
	email: z
		.string()
		.email('Debes ingresar el correo electrónico con el que te registraste.'),
});
export type RecoverPasswordValidationSchema = z.infer<typeof validationSchema>;

export default function ResetPasswordInitialStep() {
	/* Hooks */
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm<RecoverPasswordValidationSchema>({
		resolver: zodResolver(validationSchema),
		defaultValues: {
			email: '',
		},
	});
	const { shouldShowPaywall, setShouldShowPaywall } = usePaywallContext();
	const [isEmailSent, setIsEmailSent] = useState(false);

	/* Handlers */
	async function onSubmit(formData: RecoverPasswordValidationSchema) {
		const actionResult = await trySendingPasswordRecoveryEmail(formData);

		if (isErrorResponse(actionResult)) {
			setError('root', { message: actionResult.error.message });
			return;
		}

		if (!actionResult.success) {
			return;
		}

		setIsEmailSent(true);
		clearErrors();
	}

	/* Effects */
	useEffect(() => {
		if (shouldShowPaywall) {
			setShouldShowPaywall(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isEmailSent) {
		return (
			<>
				<p className="tex-base mt-6 text-pretty lg:mt-16 lg:text-lg">
					Revisa la bandeja de entrada del correo electrónico que ingresaste.{' '}
					<br />
					Recibirás allí instrucciones para generar una nueva contraseña.
				</p>
				<Button
					className="mt-10 w-full text-center"
					href={ROUTES.DASHBOARD}
					variant="outline"
					onClick={() => setShouldShowPaywall(true)}
				>
					Regresar
				</Button>
			</>
		);
	}

	return (
		<>
			<p className="tex-base mt-6 text-pretty lg:mt-16 lg:text-lg">
				Si olvidaste tu contraseña ingresa el correo electrónico con el que te
				registraste.
				<br />
				Recibirás un correo con las instrucciones para generar una nueva clave.
			</p>

			<form
				className="mt-8 flex w-full max-w-full flex-col gap-3 pb-8"
				onSubmit={(event) => void handleSubmit(onSubmit)(event)}
			>
				<TextInput
					className="mt-8 w-full"
					errorMessage={errors.email?.message}
					label="Correo electrónico"
					{...register('email')}
				/>

				{errors.root?.message && (
					<div
						className={cn([
							'flex flex-col items-center rounded-lg bg-red-100 p-3 text-sm font-bold text-red-700',
							errors.root.message ? 'visible' : 'hidden',
						])}
					>
						<p>{errors.root.message}</p>
					</div>
				)}

				<Button
					className="mt-8 flex w-full justify-center"
					disabled={isSubmitting}
					type="submit"
					variant="fill"
				>
					{isSubmitting ? 'Enviando...' : 'Continuar'}
				</Button>
			</form>

			<Button
				className="w-full text-center"
				href={ROUTES.DASHBOARD}
				variant="outline"
				onClick={() => setShouldShowPaywall(true)}
			>
				Regresar
			</Button>
		</>
	);
}
