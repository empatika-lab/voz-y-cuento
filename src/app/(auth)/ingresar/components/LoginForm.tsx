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
import { tryLogin } from '../../actions/tryLogin';

export const loginValidationSchema = z.object({
	email: z.string().email('Debes ingresar un correo electrónico válido.'),
	password: z.string().min(6, 'Tu contraseña debe tener al menos 6 caracteres.'),
});

export type ValidationSchema = z.infer<typeof loginValidationSchema>;

interface LoginFormProps {
	email?: string;
}

export default function LoginForm({ email }: LoginFormProps) {
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);
	const [formState, formAction, isSubmitting] = useActionState(tryLogin, null);

	/* Hooks */
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationSchema>({
		resolver: zodResolver(loginValidationSchema),
		defaultValues: {
			email: email ?? '',
			password: '',
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
