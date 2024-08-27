import 'server-only';

import { sha256 } from 'oslo/crypto';
import { encodeHex } from 'oslo/encoding';
import { validateJWT } from 'oslo/jwt';

export async function getPayloadSecret(): Promise<string> {
	const data = new TextEncoder().encode(process.env.PAYLOAD_SECRET);
	const hashBuffer = await sha256(data);
	const hashHex = encodeHex(hashBuffer);
	return hashHex.slice(0, 32);
}

export async function decode(jwt: string) {
	function base64StringToUInt8Array(input: string): Uint8Array {
		return Uint8Array.from(atob(input), (char) => char.charCodeAt(0));
	}

	try {
		return await validateJWT('HS256', base64StringToUInt8Array(process.env.PAYLOAD_SECRET!), jwt);
	} catch (error) {
		return false;
	}
}

export const SESSION_COOKIE_NAME = 'vyc-token';
