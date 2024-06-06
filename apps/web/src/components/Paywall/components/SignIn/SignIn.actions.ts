'use server';

/* Utils */
import fetchApi from '@/lib/utils/api';

/* Types */
import { User } from '@voz-y-cuento/types';

interface SignInDto {
	email: string;
	password: string;
}

export async function tryUserSignIn(data: SignInDto) {
	const response = await fetchApi<{ jwt: string; user: User }>({
		endpoint: `/auth/local`,
		role: 'public',
		config: {
			method: 'POST',
			body: JSON.stringify({
				identifier: data.email,
				password: data.password,
			}),
		},
	});

	return response;

	// const result: {
	// 	error?: {
	// 		message?: string;
	// 	};

	// 	jwt: string;
	// 	user: User;
	// } = await response.json();

	// if (!response) {
	// 	return {
	// 		error: 'Por favor, revisa tu conexión a internet.',
	// 		success: false,
	// 	};
	// }

	// if (result?.error?.message?.includes('identifier or password')) {
	// 	return {
	// 		error:
	// 			'Revisa el correo o la contraseña que ingresaste, alguno de estos no es correcto.',
	// 		success: false,
	// 	};
	// }

	// if (result?.jwt && result?.user) {
	// 	await createSession(result.jwt, result.user);
	// }

	return { success: false };
}
