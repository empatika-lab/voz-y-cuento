'use server';

import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

/* Utils */
import { ID_TOKEN_COOKIE_NAME, ID_TOKEN_PRIVATE_KEY, SESSION_COOKIE_NAME } from '../utils/cookies';

/* Types */
import type { User } from 'payload';

export async function isSessionValid(): Promise<boolean> {
	const cookieStorage = cookies();

	if (!cookieStorage.has(SESSION_COOKIE_NAME)) {
		return false;
	}

	const token = cookieStorage.get(SESSION_COOKIE_NAME)?.value;

	if (!token) {
		return false;
	}

	try {
		const isTokenValid = await jwtVerify(
			token,
			new TextEncoder().encode(process.env.JWT_SECRET),
		).catch((e) => {
			// eslint-disable-next-line no-console
			console.error({ e });
			return false;
		});

		if (!isTokenValid) {
			return false;
		}

		return true;
	} catch (error) {
		return false;
	}
}

export async function createSession(
	jwtToken: string,
	userData: Pick<User, 'id' | 'email' | 'username' | 'whatsapp'>,
) {
	/* Session Token */
	cookies().set({
		name: SESSION_COOKIE_NAME,
		value: jwtToken,
		secure: process.env.NODE_ENV !== 'development',
		httpOnly: true,
		path: '/',
		expires: new Date().getTime() + 90 * 24 * 60 * 60 * 1000, // 90 days
	});

	const secret = new TextEncoder().encode(ID_TOKEN_PRIVATE_KEY);
	const jwt = await new SignJWT(userData)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.sign(secret);

	/* ID Token */
	cookies().set({
		name: ID_TOKEN_COOKIE_NAME,
		value: jwt,
		secure: process.env.NODE_ENV !== 'development',
		httpOnly: true,
		path: '/',
		expires: new Date().getTime() + 90 * 24 * 60 * 60 * 1000, // 90 days
	});
}
