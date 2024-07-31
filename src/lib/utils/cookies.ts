import { jwtVerify } from "jose";

export const SESSION_COOKIE_NAME = 'vyc-s';
export const ID_TOKEN_COOKIE_NAME = 'vyc-id';
export const ID_TOKEN_PRIVATE_KEY = 'cyc-it-token-key';

// export function destroy() {
// 	cookies().set({ name: SESSION_COOKIE_NAME, value: '' });
// 	cookies().set({ name: ID_TOKEN_COOKIE_NAME, value: '' });
// }

export async function decode(jwt: string) {
	try {
		const secret = new TextEncoder().encode(ID_TOKEN_PRIVATE_KEY);
		return await jwtVerify(jwt, secret);
	} catch (error) {
		return false;
	}
}
