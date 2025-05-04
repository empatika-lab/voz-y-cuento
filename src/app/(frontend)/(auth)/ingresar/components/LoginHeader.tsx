import NextImage from 'next/image';

/* Assets */
import Logo from '@images/logo.png';

export default function LoginHeader() {
	return (
		<header>
			<NextImage
				alt="Logo de Voz y Cuento"
				className="mx-auto h-[48px] w-[140px] rounded-2xl"
				priority
				src={Logo}
			/>

			<h1 className="mt-8 text-center text-2xl font-bold">Ingresar a la Escuela</h1>

			<p className="tex-base mx-auto mt-6 text-pretty text-center lg:mt-8 lg:text-xl">
				Para continuar ingresa tu correo electrónico y contraseña.
			</p>
		</header>
	);
}
