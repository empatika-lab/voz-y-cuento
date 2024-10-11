'use client';

import NextImage from 'next/image';
import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

/* Icons */
import OpenEye from '@images/icons/eye-open.svg';
import ClosedEye from '@images/icons/eye-close.svg';

/* Components */
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';

/* Utils */
import { cn } from '@/lib/utils/classNames';
import ROUTES from '@/lib/utils/routes';

/* Actions */
import { tryRegister } from '../../actions/tryRegister';

const registerValidationSchema = z
	.object({
		email: z.string().email('Debes ingresar un e-mail válido.'),
		name: z.string().min(1, 'Debes ingresar tu nombre y apellido.'),
		whatsapp: z
			.optional(z.string().min(8, 'Por favor ingresa un número de teléfono válido'))
			.or(z.literal('')),
		password: z.string().min(6, 'Tu contraseña debe tener al menos 6 caracteres.'),
		confirmPassword: z.string().min(1, { message: 'Por favor confirma tu contraseña.' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'La contraseña y su confirmación deben coincidir. Revisalas por favor.',
	});
export type ValidationSchema = z.infer<typeof registerValidationSchema>;

export default function RegisterForm() {
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);
	const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
	const [formState, formAction, isSubmitting] = useActionState(tryRegister, null);

	/* Hooks */
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<ValidationSchema>({
		resolver: zodResolver(registerValidationSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			whatsapp: '',
		},
	});

	/* Refs */
	const formRef = useRef<HTMLFormElement>(null);

	/* Effects */
	useEffect(() => {
		if (formState?.success) {
			router.push(ROUTES.ACADEMY.MY_COURSES);
		}
	}, [formState, router]);

	useEffect(() => {
		if (formState && !formState.success && formState.error) {
			setError('root', { message: formState.error });
		}
	}, [formState, router, setError]);

	return (
		<form
			ref={formRef}
			onSubmit={(evt) => {
				evt.preventDefault();
				void handleSubmit(() => {
					startTransition(() => {
						formAction(new FormData(formRef.current!));
					});
				})(evt);
			}}
			className="flex w-full flex-col items-center justify-center gap-3 pb-8"
			autoComplete="off"
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

			<div className="mt-6 flex w-full flex-col justify-between gap-4">
				{!formState?.success && formState?.error && (
					<p
						className={cn([
							'rounded-lg bg-red-100 p-3 text-sm font-bold text-red-700',
							formState.error ? 'visible' : 'hidden',
						])}
					>
						{formState.error}
					</p>
				)}
				<Button
					className="mt-6 flex w-full justify-center"
					disabled={isSubmitting}
					type="submit"
					variant="fill"
				>
					{isSubmitting ? 'Enviando...' : 'Continuar'}
				</Button>
			</div>
		</form>
	);
}
