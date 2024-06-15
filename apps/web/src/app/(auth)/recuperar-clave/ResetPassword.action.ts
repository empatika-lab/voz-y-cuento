'use server';

/* Utils */
import fetchApi, { isSuccessResponse } from '@/lib/utils/api';

/* Types */
import { User } from '@voz-y-cuento/types';

const START_RESET_PASSWORD_ERROR = {
	UNEXPECTED_ERROR:
		'Ocurrió un error inesperado y no pudimos registrar tu cuenta. Por favor, intenta más tarde.',
	EMAIL_DOES_NOT_EXIST:
		'El e-mail que ingresaste no tiene una cuenta asociada.',
};

const SET_NEW_PASSWORD_ERROR = {
	UNEXPECTED_ERROR:
		'Ocurrió un error inesperado y no pudimos registrar tu cuenta. Por favor, intenta más tarde.',
	INVALID_CODE:
		'El enlace que recibiste por correo electrónico expiró. Hacé click en el botón Regresar para comenzar el proceso de recuperación nuevamente.',
};

interface InitialStepDto {
	email: string;
}

interface NewPasswordStepDto {
	password: string;
	passwordConfirmation: string;
	code: string;
}

export async function trySendingPasswordRecoveryEmail(data: InitialStepDto) {
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

	const userExists = await getUserByEmail(data.email).catch((e) => {
		// eslint-disable-next-line no-console
		console.error('[trySendingPasswordRecoveryEmail][getUserByEmail]', e);
		return {
			success: false,
			error: {
				message: START_RESET_PASSWORD_ERROR.UNEXPECTED_ERROR,
			},
		};
	});

	if (isSuccessResponse(userExists) && userExists.data.length === 0) {
		return {
			success: false,
			error: {
				message: START_RESET_PASSWORD_ERROR.EMAIL_DOES_NOT_EXIST,
			},
		};
	}

	const response = await fetchApi<{ ok: boolean }>({
		endpoint: `/auth/forgot-password`,
		role: 'admin',
		config: {
			method: 'POST',
			body: JSON.stringify({
				email: data.email,
			}),
		},
	});

	if (isSuccessResponse(response) && response.data.ok) {
		return {
			success: true,
		};
	}

	return { success: false };
}

export async function trySettingNewPassword(data: NewPasswordStepDto) {
	const response = await fetchApi<{ ok: boolean }>({
		endpoint: `/auth/reset-password`,
		role: 'admin',
		config: {
			method: 'POST',
			body: JSON.stringify({
				password: data.password,
				passwordConfirmation: data.passwordConfirmation,
				code: data.code,
			}),
		},
	});

	if (!isSuccessResponse(response)) {
		if (response.error.message.includes('Incorrect code'))
			return {
				success: false,
				error: {
					message: SET_NEW_PASSWORD_ERROR.INVALID_CODE,
				},
			};

		return {
			success: false,
			error: {
				message: SET_NEW_PASSWORD_ERROR.UNEXPECTED_ERROR,
			},
		};
	}

	return response;
}
