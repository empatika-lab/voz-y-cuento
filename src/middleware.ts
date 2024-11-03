import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseJWT, validateJWT } from 'oslo/jwt';

/* Utils */
import { getPayloadSecret } from '@lib/utils/auth';
import ROUTES from '@lib/utils/routes';

async function checkIfLogged(req: NextRequest) {
	const secret = await getPayloadSecret();
	const token = req.cookies.get('vyc-token')?.value;

	if (!secret || !token) return false;

	try {
		const decoded = parseJWT(token);
		if (!decoded) return false;
		const isValid = await validateJWT(
			decoded.algorithm,
			new TextEncoder().encode(secret),
			decoded.value,
		).catch((err) => {
			// eslint-disable-next-line no-console
			console.error('Error validating JWT:', err);
			return false;
		});
		if (!isValid) return false;
		return true;
	} catch {
		return false;
	}
}

export async function middleware(req: NextRequest) {
	const { nextUrl } = req;
	const isLoggedIn = await checkIfLogged(req);
	const isProtected = req.nextUrl.pathname.includes('/escuela');

	if (isLoggedIn) {
		if (isProtected) return NextResponse.next();

		return NextResponse.redirect(new URL(ROUTES.ACADEMY.MY_COURSES, req.url));
	}

	if (!isLoggedIn && isProtected) {
		return Response.redirect(new URL(ROUTES.LOGIN, nextUrl));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api and admin routes
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|admin|image).*)',
	],
};
