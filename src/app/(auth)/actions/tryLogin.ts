'use server';

import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { cookies } from 'next/headers';

/* Types */
import type { Student } from '@/payload-types';
import type { ServerActionResponse } from '@/lib/types';

interface PayloadLoginResponse {
	exp?: number;
	token?: string;
	user?: Partial<Student>;
}

export async function tryLogin(
	_prevState: ServerActionResponse<PayloadLoginResponse> | null,
	formData: FormData,
): Promise<ServerActionResponse<PayloadLoginResponse>> {
	const payload = await getPayloadHMR({
		config: configPromise,
	});

	try {
		const loginResult = await payload.login({
			collection: 'students',
			data: {
				email: formData.get('email') as string,
				password: formData.get('password') as string,
			},
		});

		const cookieManager = await cookies();

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
		payload.logger.error(`[tryLogin]: ${error as string}`);
		return {
			success: false,
			error: error instanceof Error ? error.message : 'An unknown error occurred',
		};
	}
}
