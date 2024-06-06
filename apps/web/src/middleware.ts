import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

/* Utils */
import { SESSION_COOKIE_NAME } from '@frontend/lib/utils/cookies';

export async function middleware(request: NextRequest) {
	const cookie = request.cookies.get(SESSION_COOKIE_NAME);

	if (!cookie) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	if (cookie) {
		const { value: token } = cookie;
		if (!token) {
			return NextResponse.redirect(new URL('/', request.url));
		}

		const isTokenValid = await jwtVerify(
			token,
			new TextEncoder().encode(process.env.JWT_SECRET),
		);

		if (!isTokenValid) {
			return NextResponse.redirect(new URL('/', request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/escuela', '/escuela/:path*'],
};
