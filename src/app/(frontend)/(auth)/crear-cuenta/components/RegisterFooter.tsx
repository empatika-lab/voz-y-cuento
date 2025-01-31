/* Components */
import Button from '@/components/Button';

/* Utils */
import ROUTES from '@/lib/utils/routes';

export default function RegisterFooter() {
	return (
		<footer className="mt-6 flex w-full flex-col items-center justify-center rounded-xl border border-gray-300 bg-cyan-50 p-3">
			<p>¿Ya tienes una cuenta?</p>

			<Button
				className="mt-4 w-full lg:max-w-fit text-center text-cyan-700"
				variant="outline"
				href={ROUTES.LOGIN}
			>
				Ingresar
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
	);
}
