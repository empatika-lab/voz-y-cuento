'use server';

import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

/* Types */
import type { ServerActionResponse } from '@/lib/types/action';

/* Utils */
import { isPayloadErrorResponse } from '@/lib/utils/error';

interface RecoverPasswordData {
	email: string;
}

export async function trySendingResetPasswordEmail(
	_prevState: ServerActionResponse<RecoverPasswordData> | null,
	formData: FormData,
): Promise<ServerActionResponse<RecoverPasswordData>> {
	const payload = await getPayloadHMR({
		config: configPromise,
	});

	try {
		// const result = await payload.sendEmail({
		// 	collection: 'students',
		// 	data: {
		// 		email: formData.get('email') as string,
		// 	},
		// 	disableEmail: true,
		// });

		// console.log({ result });

		// if (!result) {
		// 	payload.logger.error('[trySendingResetPasswordEmail]:', result);
		// 	return {
		// 		success: false,
		// 		error:
		// 			'Error inesperado al intentar al enviar un e-mail con instrucciones. Por favor, intenta más tarde.',
		// 	};
		// }

		return { success: true, data: { email: '' } };
	} catch (error) {
		payload.logger.error(`[trySendingResetPasswordEmail]: ${error as string}`);

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
