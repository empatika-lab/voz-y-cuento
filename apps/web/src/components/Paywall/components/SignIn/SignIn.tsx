'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

/* Assets */
import Logo from '@images/logo.png';

/* Icons */
import OpenEye from '@icons/eye-open.svg';
import ClosedEye from '@icons/eye-close.svg';

/* Components */
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';

/* Hooks */
import { usePaywallContext } from '@/lib/context/paywall';

/* Actions */
import { tryUserSignIn } from './SignIn.actions';
import { createSession } from '@/lib/actions/session';

/* Utils */
import { cn } from '@/lib/utils/classNames';
import { isErrorResponse, isSuccessResponse } from '@/lib/utils/api';
import ROUTES from '@/lib/utils/routes';

/* Types */
import type { User } from '@voz-y-cuento/types';

interface SignInProps {
	switchToSignUp: () => void;
}

const validationSchema = z.object({
	email: z.string().email('Debes ingresar un correo electrónico válido.'),
	password: z
		.string()
		.min(6, 'Tu contraseña debe tener al menos 6 caracteres.'),
});

export type LocalRegisterValidationSchema = z.infer<typeof validationSchema>;

const SIGN_IN_ERROR = {
	UNEXPECTED_ERROR:
		'Ocurrió un error inesperado y no pudimos registrar tu cuenta. Por favor, intenta más tarde.',
	BAD_CREDENTIALS:
		'Revisa el correo o la contraseña que ingresaste, alguno de estos no es correcto.',
};

export default function SignIn({ switchToSignUp }: SignInProps) {
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);

	/* Hooks */
	const router = useRouter();
	const { onSuccessRedirectUrl } = usePaywallContext();
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm<LocalRegisterValidationSchema>({
		resolver: zodResolver(validationSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	/* Handlers */
	async function onSubmit(formData: LocalRegisterValidationSchema) {
		const actionResult = await tryUserSignIn(formData);

		if (isErrorResponse(actionResult)) {
			if (actionResult.error.message === 'Invalid identifier or password') {
				setError('root', { message: SIGN_IN_ERROR.BAD_CREDENTIALS });
				return;
			}

			setError('root', { message: SIGN_IN_ERROR.UNEXPECTED_ERROR });
			return;
		}

		if (isSuccessResponse<{ jwt: string; user: User }>(actionResult)) {
			await createSession(actionResult.data.jwt, actionResult.data.user);
		}

		clearErrors();

		router.push(onSuccessRedirectUrl, { scroll: true });
	}

	return (
		<>
			<NextImage
				alt="Logo de Voz y Cuento"
				className="mx-auto h-[48px] w-[140px] rounded-2xl"
				priority
				src={Logo}
			/>

			<p className="tex-base mt-6 lg:mt-8 lg:text-xl">
				Para continuar ingresa tu correo electrónico y contraseña.
			</p>

			<form
				className="flex max-w-full flex-col items-center justify-center gap-3 pb-8 pt-4"
				onSubmit={(event) => void handleSubmit(onSubmit)(event)}
			>
				{/* Email */}
				<TextInput
					className="mt-8"
					errorMessage={errors.email?.message}
					label="Correo electrónico"
					{...register('email')}
				/>

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
					className="mt-12"
					errorMessage={errors.password?.message}
					label="Contraseña"
					type={isPasswordHidden ? 'password' : 'text'}
					{...register('password')}
				/>

				<footer className="mt-6 flex w-full flex-col justify-between gap-4">
					{errors.root?.message && (
						<p
							className={cn([
								'rounded-lg bg-red-100 p-3 text-sm font-bold text-red-700',
								errors.root.message ? 'visible' : 'hidden',
							])}
						>
							{errors.root.message}
						</p>
					)}
					<Button
						className="mt-2 flex w-full justify-center"
						disabled={isSubmitting}
						type="submit"
						variant="fill"
					>
						{isSubmitting ? 'Enviando...' : 'Continuar'}
					</Button>

					<div className="mt-6 flex w-full flex-col items-center justify-center rounded-xl border border-gray-300 bg-cyan-50 p-3">
						<p>¿No tienes una cuenta?</p>
						<Button
							className="mt-4 w-full lg:max-w-fit"
							variant="outline"
							onClick={switchToSignUp}
						>
							Registrarme
						</Button>
						<Button
							className="mt-4 border-0 text-center text-sm hover:shadow-none"
							href={ROUTES.RESET_PASSWORD}
							type="button"
							variant="ghost"
						>
							<span className="text-sm">Olvidé mi contraseña</span>
						</Button>
					</div>
				</footer>
			</form>
		</>
	);
}
