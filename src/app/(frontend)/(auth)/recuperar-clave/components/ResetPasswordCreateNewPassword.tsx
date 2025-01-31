'use client';

import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import NextImage from 'next/image';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

/* Components */
import TextInput from '@/components/TextInput';

/* Icons */
import OpenEye from '@images/icons/eye-open.svg';
import ClosedEye from '@images/icons/eye-close.svg';

/* Server Acions */
import { trySettingNewPassword } from '../../actions/trySettingNewPassword';

/* Components */
import Button from '@/components/Button';

/* Utils */
import { cn } from '@/lib/utils/classNames';
import ROUTES from '@/lib/utils/routes';

interface ResetPasswordCreateNewPasswordProps {
	code: string;
	email: string;
}

const validationSchema = z
	.object({
		password: z.string().min(6, 'Tu nueva contraseña debe tener al menos 6 caracteres.'),
		passwordConfirmation: z.string().min(1, { message: 'Por favor confirmá tu contraseña.' }),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		path: ['passwordConfirmation'],
		message: 'La contraseña y su confirmación deben coincidir. Revisalas por favor.',
	});
export type RecoverPasswordValidationSchema = z.infer<typeof validationSchema>;

export default function ResetPasswordCreateNewPassword({
	code,
	email,
}: ResetPasswordCreateNewPasswordProps) {
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);
	const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);
	const [formState, formAction, isSubmitting] = useActionState(trySettingNewPassword, null);

	/* Hooks */
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<RecoverPasswordValidationSchema>({
		resolver: zodResolver(validationSchema),
		defaultValues: {
			password: '',
			passwordConfirmation: '',
		},
	});

	/* Refs */
	const formRef = useRef<HTMLFormElement>(null);

	/* Effects */
	useEffect(() => {
		if (formState?.success) {
			setIsSuccess(true);
			clearErrors();
			return;
		}

		if (!formState?.success && formState?.error) {
			setError('root', { message: formState.error });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formState]);

	if (isSuccess) {
		return (
			<>
				<p className="tex-base mt-6 text-pretty lg:mt-16 lg:text-lg">
					¡Listo! Generaste una nueva clave de ingreso.
					<br /> Haz click en el botón de Continuar para ingresar a la Escuela utilizando la
					contraseña que acabas de crear.
				</p>

				<Button
					className="mt-10 w-full text-center"
					variant="fill"
					href={`${ROUTES.LOGIN}?email=${email}`}
				>
					Continuar
				</Button>
			</>
		);
	}

	return (
		<>
			<p className="tex-base mt-8 text-pretty lg:mt-16 lg:text-lg">
				Recupera acceso a la Escuela creando una nueva contraseña.
			</p>

			<form
				className="mt-8 flex w-full max-w-full flex-col gap-3 pb-8"
				onSubmit={(evt) => {
					evt.preventDefault();
					void handleSubmit(() => {
						startTransition(() => {
							formAction(new FormData(formRef.current!));
						});
					})(evt);
				}}
				ref={formRef}
			>
				{/* Code */}
				<input type="hidden" value={code} name="code" />

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

			<Button className="w-full text-center" href={ROUTES.ACADEMY.MY_COURSES} variant="outline">
				Regresar
			</Button>
		</>
	);
}
