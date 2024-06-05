'use server';

/* Utils */
import fetchApi, { isSuccessResponse } from '@/lib/utils/api';

/* Types */
import type { User } from '@voz-y-cuento/types';

const SIGN_UP_ERROR = {
	UNEXPECTED_ERROR:
		'Ocurrió un error inesperado y no pudimos registrar tu cuenta. Por favor, intenta más tarde.',
	EMAIL_TAKEN:
		'Este nombre ya se encuentra registrado. Si es tuya podés recuperar tu contraseña en el enlace que se encuentra debajo.',
};

interface SignUpDto {
	email: string;
	name: string;
	password: string;
	whatsapp?: string;
}

export async function tryUserSignUp(data: SignUpDto) {
	async function getUserByEmail(email: string) {
		const response = await fetchApi<User[]>({
			endpoint: '/users',
			role: 'admin',
			queryParams: {
				'filters[email][$eq]': email,
			},
		});

		return response;
	}

	async function createUser(userData: SignUpDto) {
		/* Can't use our standard fetchApi here since the response is different */
		const adminToken = process.env.ADMIN_API_TOKEN;

		const response = await fetch(
			`${process.env.STRAPI_API_URL}/api/auth/local/register`,
			{
				headers: {
					'Content-type': 'application/json',
					Authorization: `bearer ${adminToken}`,
				},
				method: 'POST',
				body: JSON.stringify({
					email: userData.email,
					username: userData.email,
					name: userData.name,
					password: userData.password,
					whatsapp: userData.whatsapp,
				}),
			},
		);

		return response;
	}

	const userExists = await getUserByEmail(data.email).catch((e) => {
		// eslint-disable-next-line no-console
		console.error('[tryUserSignUp][getUserByEmail]', e);
		return {
			success: false,
			error: SIGN_UP_ERROR.UNEXPECTED_ERROR,
		};
	});

	if (isSuccessResponse(userExists) && userExists.data.length > 0) {
		return {
			success: false,
			error: SIGN_UP_ERROR.EMAIL_TAKEN,
		};
	}

	const creationResult = await createUser(data).catch((e) => {
		// eslint-disable-next-line no-console
		console.error('[tryUserSignUp][getUserByEmail]', e);
		return {
			success: false,
			error: SIGN_UP_ERROR.UNEXPECTED_ERROR,
		};
	});

	if ('status' in creationResult && creationResult.status === 200) {
		const newUser = await getUserByEmail(data.email).catch((e) => {
			// eslint-disable-next-line no-console
			console.error('[tryUserSignUp][getUserByEmail]', e);
			return {
				success: false,
				error: SIGN_UP_ERROR.UNEXPECTED_ERROR,
			};
		});

		if (isSuccessResponse(newUser) && newUser.data.length > 0) {
			return {
				success: true,
				data: newUser.data,
			};
		}

		return {
			success: false,
			error: SIGN_UP_ERROR.UNEXPECTED_ERROR,
		};
	}

	return {
		success: false,
		error: SIGN_UP_ERROR.UNEXPECTED_ERROR,
	};
}
