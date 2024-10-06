'use client';

import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

/* Components */
import TextInput from '@/components/TextInput';

/* Components */
import Button from '@/components/Button';

/* Utils */
import { cn } from '@/lib/utils/classNames';
import ROUTES from '@/lib/utils/routes';

/* Actions */
import { trySendingResetPasswordEmail } from '../../actions/trySendingResetPasswordEmail';

const validationSchema = z.object({
	email: z.string().email('Debes ingresar el correo electrónico con el que te registraste.'),
});
export type RecoverPasswordValidationSchema = z.infer<typeof validationSchema>;

export default function ResetPasswordInitialStep() {
	const [formState, formAction, isSubmitting] = useActionState(trySendingResetPasswordEmail, null);

	/* Hooks */
	const {
		register,
		handleSubmit,
		clearErrors,
		formState: { errors },
	} = useForm<RecoverPasswordValidationSchema>({
		resolver: zodResolver(validationSchema),
		defaultValues: {
			email: '',
		},
	});
	const [isEmailSent, setIsEmailSent] = useState(false);

	/* Refs */
	const formRef = useRef<HTMLFormElement>(null);

	/* Effects */
	useEffect(() => {
		if (formState?.success) {
			setIsEmailSent(true);
			clearErrors();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formState]);

	if (isEmailSent) {
		return (
			<>
				<p className="tex-base mt-6 text-pretty lg:mt-16 lg:text-lg">
					Revisa la bandeja de entrada del correo electrónico que ingresaste. <br />
					Recibirás allí instrucciones para generar una nueva contraseña.
				</p>
				<Button
					className="mt-10 w-full text-center"
					href={ROUTES.ACADEMY.MY_COURSES}
					variant="outline"
				>
					Regresar
				</Button>
			</>
		);
	}

	return (
		<>
			<p className="tex-base mt-6 text-pretty lg:mt-16 lg:text-lg">
				Si olvidaste tu contraseña ingresa el correo electrónico con el que te registraste.
				<br />
				Recibirás un correo con las instrucciones para generar una nueva clave.
			</p>

			<form
				className="mt-8 flex w-full max-w-full flex-col gap-3 pb-8"
				ref={formRef}
				onSubmit={(evt) => {
					evt.preventDefault();
					void handleSubmit(() => {
						startTransition(() => {
							formAction(new FormData(formRef.current!));
						});
					})(evt);
				}}
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

			<Button className="w-full text-center" href={ROUTES.ACADEMY.MY_COURSES} variant="outline">
				Regresar
			</Button>
		</>
	);
}
