'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import { z } from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/* Assets */
import Logo from '@images/logo.png';

/* Components */
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';

/* Icons */
import OpenEye from '@icons/eye-open.svg';
import ClosedEye from '@icons/eye-close.svg';

/* Hooks */
import { useRouter } from 'next/navigation';
import { tryUserSignUp } from './SignUp.actions';
import { usePaywallContext } from '@/lib/context/paywall';

/* Utils */
import { cn } from '@/lib/utils/classNames';

interface SignUpProps {
	switchToSignIn: () => void;
}

const validationSchema = z
	.object({
		email: z.string().email('Debes ingresar un e-mail válido.'),
		name: z.string().min(1, 'Debes ingresar tu nombre y apellido.'),
		whatsapp: z
			.optional(
				z.string().min(8, 'Por favor ingresa un número de teléfono válido'),
			)
			.or(z.literal('')),
		password: z
			.string()
			.min(6, 'Tu contraseña debe tener al menos 6 caracteres.'),
		confirmPassword: z
			.string()
			.min(1, { message: 'Por favor confirmá tu contraseña.' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message:
			'La contraseña y su confirmación deben coincidir. Revisalas por favor.',
	});

export type LocalRegisterValidationSchema = z.infer<typeof validationSchema>;

export default function SignUp({ switchToSignIn }: SignUpProps) {
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);
	const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

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
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			whatsapp: '',
		},
	});

	/* Handlers */
	async function onSubmit(formData: LocalRegisterValidationSchema) {
		const action = await tryUserSignUp(formData);

		if (!action.success && action.error) {
			setError('root', { message: action.error });
			return;
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

			<h1 className="mx-auto mt-12 text-center text-2xl font-bold">
				Creá tu cuenta
			</h1>
			<form
				className="flex max-w-full flex-col items-center justify-center gap-3 pb-8 pt-4"
				onSubmit={(event) => void handleSubmit(onSubmit)(event)}
			>
				{/* Name */}
				<TextInput
					className="mt-12"
					errorMessage={errors.name?.message}
					label="Nombre y Apellido"
					{...register('name')}
				/>

				{/* Email */}
				<TextInput
					className="mt-8"
					errorMessage={errors.email?.message}
					label="Correo electrónico"
					{...register('email')}
				/>

				{/* Whatsapp */}
				<TextInput
					className="mt-8"
					errorMessage={errors.whatsapp?.message}
					label="Número de Whatsapp"
					{...register('whatsapp')}
				/>

				{/* Email Taken Error */}
				{/* {shouldShowEmailTakenError && (
					<p className="mt-8 rounded-xl bg-red-50 p-4 font-medium">
						El email con el que intentaste registrarte ya está en uso,
						<NextLink
							className="text-cyan-800 hover:text-cyan-900"
							href="/ingreso"
						>
							{' '}
							ingresá con tu contraseña
						</NextLink>{' '}
						o{' '}
						<NextLink
							className="text-cyan-800 hover:text-cyan-900"
							href="/recuperar"
						>
							recuperala
						</NextLink>{' '}
						si no la recordás.
					</p>
				)} */}

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
					errorMessage={errors.confirmPassword?.message}
					label="Repetir contraseña"
					type={isConfirmPasswordHidden ? 'password' : 'text'}
					{...register('confirmPassword')}
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
						className="flex w-full justify-center"
						disabled={isSubmitting}
						type="submit"
						variant="fill"
					>
						{isSubmitting ? 'Enviando...' : 'Continuar'}
					</Button>

					<div className="mt-6 flex w-full flex-col items-center justify-center rounded-xl border border-gray-300 bg-cyan-50 p-3">
						<p>¿Ya tienes una cuenta?</p>
						<Button
							className="mt-4 w-full lg:max-w-fit"
							variant="outline"
							onClick={switchToSignIn}
						>
							Ingresar
						</Button>
					</div>
				</footer>
			</form>
		</>
	);
}
