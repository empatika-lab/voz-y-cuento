'use server';

import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

/* Types */
import type { ServerActionResponse } from '@/lib/types';

interface TrySettingNewPasswordData {
	newPassword: string;
	code: string;
}

export async function trySettingNewPassword(
	_prevState: ServerActionResponse<TrySettingNewPasswordData> | null,
	formData: FormData,
): Promise<ServerActionResponse<TrySettingNewPasswordData>> {
	const payload = await getPayloadHMR({
		config: configPromise,
	});

	const code = formData.get('code') as string;
	const password = formData.get('password') as string;

	try {
		await payload.resetPassword({
			collection: 'students',
			overrideAccess: true,
			data: {
				password,
				token: code,
			},
		});

		return { success: true, data: { code: '', newPassword: '' } };
	} catch (error) {
		payload.logger.error(`[trySettingNewPassword]: ${error as string}`);

		return {
			success: false,
			error:
				'Hubo un error al crear tu nueva contraseña. Intenta comenzar el proceso de recuperación de contraseña nuevamente por favor.',
		};
	}
}
