'use server';

import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

import type { ServerActionResponse } from '@/lib/types/action';
import type { Student } from '@/payload-types';
import { cookies } from 'next/headers';
import { isPayloadErrorResponse } from '@/lib/utils/error';

interface PayloadRegisterData {
	exp?: number;
	token?: string;
	user?: Partial<Student>;
}

export async function tryRegister(
	_prevState: ServerActionResponse<PayloadRegisterData> | null,
	formData: FormData,
): Promise<ServerActionResponse<PayloadRegisterData>> {
	const payload = await getPayloadHMR({
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

		console.log({ registerResult });

		if (!registerResult.id) {
			payload.logger.error('[tryRegister]:', registerResult);
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

		const cookieManager = cookies();
		cookieManager.set({
			expires: new Date(loginResult.exp! * 1000),
			httpOnly: true,
			name: 'vyc-token',
			path: '/',
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			value: loginResult.token!,
		});

		return { success: true, data: loginResult };
	} catch (error) {
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
