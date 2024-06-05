'use client';

import NextImage from 'next/image';

/* Assets */
import Logo from '@images/logo.png';

/* Types */
import Button from '@/components/Button';

interface SignInProps {
	switchToSignUp: () => void;
}

export default function SignIn({ switchToSignUp }: SignInProps) {
	return (
		<article className="mx-auto flex h-full max-w-[314px] lg:max-w-[356px] flex-col items-center justify-center lg:px-4">
			<NextImage
				alt="Logo de Voz y Cuento"
				className="h-[48px] w-[140px] rounded-2xl"
				priority
				src={Logo}
			/>

			<p className="tex-base lg:text-2xl mt-6 lg:mt-8">
				Para continuar ingresa tu correo electrónico y contraseña.
			</p>

			<div className="mt-12 flex flex-col items-center justify-center w-full rounded-xl border border-gray-300 bg-cyan-50 p-3">
				<p>¿No tienes una cuenta?</p>
				<Button
					className="mt-4 w-full lg:max-w-fit"
					variant="outline"
					onClick={switchToSignUp}
				>
					Crear mi cuenta
				</Button>
			</div>
		</article>
	);
}
