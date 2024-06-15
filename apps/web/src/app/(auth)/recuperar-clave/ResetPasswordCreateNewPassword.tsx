'use client';

interface ResetPasswordCreateNewPasswordProps {
	code: string;
	email: string;
}

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NextImage from 'next/image';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

/* Components */
import TextInput from '@/components/TextInput';

/* Types */
import type { User } from '@voz-y-cuento/types';

/* Icons */
import OpenEye from '@icons/eye-open.svg';
import ClosedEye from '@icons/eye-close.svg';

/* Server Acions */
import { trySettingNewPassword } from './ResetPassword.action';

/* Components */
import Button from '@/components/Button';

/* Utils */
import { isErrorResponse, isSuccessResponse } from '@/lib/utils/api';
import { cn } from '@/lib/utils/classNames';
import ROUTES from '@/lib/utils/routes';
import { usePaywallContext } from '@/lib/context/paywall';
import { tryUserSignIn } from '@/components/Paywall/components/SignIn/SignIn.actions';
import { createSession } from '@/lib/actions/session';

const validationSchema = z
	.object({
		password: z
			.string()
			.min(6, 'Tu nueva contraseña debe tener al menos 6 caracteres.'),
		passwordConfirmation: z
			.string()
			.min(1, { message: 'Por favor confirmá tu contraseña.' }),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		path: ['passwordConfirmation'],
		message:
			'La contraseña y su confirmación deben coincidir. Revisalas por favor.',
	});
export type RecoverPasswordValidationSchema = z.infer<typeof validationSchema>;

export default function ResetPasswordCreateNewPassword({
	code,
	email,
}: ResetPasswordCreateNewPasswordProps) {
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);
	const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);

	/* Hooks */
	const router = useRouter();
	const { setShouldShowPaywall } = usePaywallContext();
	const {
		register,
		handleSubmit,
		setError,
		getValues,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm<RecoverPasswordValidationSchema>({
		resolver: zodResolver(validationSchema),
		defaultValues: {
			password: '',
			passwordConfirmation: '',
		},
	});

	/* Handlers */
	async function onSubmit(formData: RecoverPasswordValidationSchema) {
		const actionResult = await trySettingNewPassword({
			password: formData.password,
			passwordConfirmation: formData.passwordConfirmation,
			code,
		});

		if (isErrorResponse(actionResult)) {
			setError('root', { message: actionResult.error.message });
			return;
		}

		if (!actionResult.success) {
			return;
		}

		setIsSuccess(true);
		clearErrors();
	}

	async function autoLogUserInAndRedirect() {
		const actionResult = await tryUserSignIn({
			email,
			password: getValues('password'),
		});

		if (isSuccessResponse<{ jwt: string; user: User }>(actionResult)) {
			await createSession(actionResult.data.jwt, actionResult.data.user);
		}

		clearErrors();
		router.push(ROUTES.DASHBOARD, { scroll: true });
	}

	if (isSuccess) {
		return (
			<>
				<p className="tex-base mt-6 text-pretty lg:mt-16 lg:text-lg">
					¡Listo! Generaste una nueva contraseña. <br />
					Hace click en el botón de Continuar para ingresar a la Escuela.
				</p>

				<Button
					className="mt-10 w-full text-center"
					variant="fill"
					onClick={autoLogUserInAndRedirect}
				>
					Continuar
				</Button>
			</>
		);
	}

	return (
		<>
			<p className="tex-base mt-6 text-pretty lg:mt-16 lg:text-lg">
				Ingresá una nueva contraseña
			</p>

			<form
				className="mt-8 flex w-full max-w-full flex-col gap-3 pb-8"
				onSubmit={(event) => void handleSubmit(onSubmit)(event)}
			>
				{/* Password */}
				<TextInput
					Icon={
						isPasswordHidden ? (
							<NextImage
								alt=""
								className="cursor-pointer"
								height={24}
								src={ClosedEye}
								width={24}
								onClick={() => setIsPasswordHidden((current) => !current)}
							/>
						) : (
							<NextImage
								alt=""
								className="cursor-pointer"
								height={24}
								src={OpenEye}
								width={24}
								onClick={() => setIsPasswordHidden((current) => !current)}
							/>
						)
					}
					className="mt-8"
					errorMessage={errors.password?.message}
					label="Contraseña"
					type={isPasswordHidden ? 'password' : 'text'}
					{...register('password')}
				/>

				{/* Confirm Password */}
				<TextInput
					Icon={
						isConfirmPasswordHidden ? (
							<NextImage
								alt=""
								className="cursor-pointer"
								height={24}
								role="button"
								src={ClosedEye}
								width={24}
								onClick={() => {
									setIsConfirmPasswordHidden((current) => !current);
								}}
							/>
						) : (
							<NextImage
								alt=""
								className="cursor-pointer"
								height={24}
								role="button"
								src={OpenEye}
								width={24}
								onClick={() => {
									setIsConfirmPasswordHidden((current) => !current);
								}}
							/>
						)
					}
					className="mt-8"
					errorMessage={errors.passwordConfirmation?.message}
					label="Repetir contraseña"
					type={isConfirmPasswordHidden ? 'password' : 'text'}
					{...register('passwordConfirmation')}
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
