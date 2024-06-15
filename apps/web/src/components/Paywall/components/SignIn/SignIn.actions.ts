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
}
