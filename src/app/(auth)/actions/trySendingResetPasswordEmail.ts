'use server';

import 'server-only';

import configPromise from '@payload-config';
import { getPayload } from 'payload';
import sendgrid, { type ClientResponse } from '@sendgrid/mail';

/* Types */
import type { ServerActionResponse } from '@/lib/types';

/* Utils */
import { isPayloadErrorResponse } from '@/lib/utils/error';

interface RecoverPasswordData {
	email: string;
}

export async function trySendingResetPasswordEmail(
	_prevState: ServerActionResponse<RecoverPasswordData> | null,
	formData: FormData,
): Promise<ServerActionResponse<RecoverPasswordData>> {
	const payload = await getPayload({
		config: configPromise,
	});

	const email = formData.get('email') as string;

	try {
		const resetToken = await payload.forgotPassword({
			disableEmail: true,
			data: {
				email,
			},
			collection: 'students',
		});

		if (!resetToken) {
			payload.logger.error('[trySendingResetPasswordEmail]: could not get reset password token.');
			return {
				success: false,
				error:
					'Error inesperado al intentar al enviar un e-mail con instrucciones. Por favor, intenta más tarde.',
			};
		}

		sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);
		const sengridResponse = await sendgrid.send({
			dynamicTemplateData: {
				reset_url: `${process.env.NEXT_PUBLIC_WEB_URL}/recuperar-clave?step=new-password&code=${resetToken}&email=${email}`,
			},
			from: 'vozycuento@gmail.com',
			subject: 'Voz y Cuento - Contraseña olvidada',
			templateId: 'd-61f19b818b9f4b31a5f878aae103c54b',
			to: email,
		});

		if (sengridResponse.at(0) && (sengridResponse.at(0) as ClientResponse).statusCode !== 202) {
			return {
				success: false,
				error:
					'Error inesperado al intentar al enviar un e-mail con instrucciones. Por favor, intenta más tarde.',
			};
		}

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
