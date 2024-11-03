import NextImage from 'next/image';

/* Assets */
import Logo from '@images/logo.png';

export default function RegisterHeader() {
	return (
		<header>
			<NextImage
				alt="Logo de Voz y Cuento"
				className="mx-auto h-[48px] w-[140px] rounded-2xl"
				priority
				src={Logo}
			/>

			<h1 className="mt-8 text-2xl font-bold text-center">Crea tu cuenta</h1>

			<p className="tex-base mt-6 lg:mt-8 lg:text-xl text-pretty mx-auto text-center">
				Registrate usando un correo electrónico y una contraseña.
			</p>
		</header>
	);
}
