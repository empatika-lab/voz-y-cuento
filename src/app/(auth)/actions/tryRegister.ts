'use server';

import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { cookies } from 'next/headers';

/* Types */
import type { ServerActionResponse } from '@/lib/types';
import type { Student } from '@/payload-types';

/* Utils */
import { isPayloadErrorResponse } from '@/lib/utils/error';
import { SESSION_COOKIE_NAME } from '@/lib/utils/auth';

interface PayloadRegisterResponse {
	exp?: number;
	token?: string;
	user?: Partial<Student>;
}

export async function tryRegister(
	_prevState: ServerActionResponse<PayloadRegisterResponse> | null,
	formData: FormData,
): Promise<ServerActionResponse<PayloadRegisterResponse>> {
	const payload = await getPayload({
		config: configPromise,
	});

	try {
		const registerResult = await payload.create({
			collection: 'students',
			data: {
				name: formData.get('name') as string,
				email: formData.get('email') as string,
				password: formData.get('password') as string,
				whatsapp: formData.get('whatsapp') as string,
			},
		});

		if (!registerResult.id) {
			payload.logger.error(`[tryRegister]: Did not get response from API`);
			return {
				success: false,
				error: 'Error inesperado al intentar crear la cuenta. Por favor, intenta más tarde.',
			};
		}

		const loginResult = await payload.login({
			collection: 'students',
			data: {
				email: registerResult.email,
				password: formData.get('password') as string,
			},
		});

		const cookieManager = await cookies();
		cookieManager.set({
			expires: new Date(loginResult.exp! * 1000),
			httpOnly: true,
			name: SESSION_COOKIE_NAME,
			path: '/',
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			value: loginResult.token!,
		});

		return { success: true, data: loginResult };
	} catch (error) {
		payload.logger.error(`[tryRegister]: ${error as string}`);

		if (isPayloadErrorResponse(error)) {
			return {
				success: false,
				error: error.data?.errors?.at(0)?.message ?? 'Hubo un error al enviar tus datos.',
			};
		}
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Hubo un error al enviar tus datos.',
		};
	}
}
