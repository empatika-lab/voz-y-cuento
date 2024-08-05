import NextImage from 'next/image';

/* Assets */
import Logo from '@images/logo.png';
import Arrow from '@images/icons/arrow-right.svg';

/* Components */
import Button from '@/components/Button';
import LoginForm from './components/LoginForm';

/* Utils */
import ROUTES from '@/lib/utils/routes';
// import { AuthButton } from './button';

export default function Login() {
	return (
		<article className="bg-cyan-25 min-h-full flex items-center flex-col py-10 ">
			<div className="max-w-[356px] px-5">
				<NextImage
					alt="Logo de Voz y Cuento"
					className="mx-auto h-[48px] w-[140px] rounded-2xl"
					priority
					src={Logo}
				/>

				<p className="tex-base mt-6 lg:mt-8 lg:text-xl text-pretty mx-auto text-center">
					Para continuar ingresa tu correo electrónico y contraseña.
				</p>

				{/* <AuthButton /> */}

				<LoginForm />

				<footer className="mt-6 flex w-full flex-col items-center justify-center rounded-xl border border-gray-300 bg-cyan-50 p-3">
					<p>¿No tienes una cuenta?</p>

					<Button
						className="mt-4 w-full lg:max-w-fit text-center text-cyan-700"
						variant="outline"
						href={ROUTES.REGISTER}
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
				</footer>

				<Button
					className="mt-8 text-center text-sm w-full max-w-none mx-auto block"
					href={ROUTES.HOME}
					type="button"
					variant="ghost"
				>
					<div className="flex gap-4 justify-center ">
						<NextImage
							src={Arrow}
							alt="Regresar a la página inicial"
							className="w-4 h-auto rotate-180"
						/>
						<span className="text-sm">Regresar</span>
					</div>
				</Button>
			</div>
		</article>
	);
}
