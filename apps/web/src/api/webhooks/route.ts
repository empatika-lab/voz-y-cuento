import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

interface StrapiWebhook {
	event: string;
	model: string;
	uid: string;
	entry: Record<
		string,
		string | number | boolean | Record<string, string | number | boolean>
	>;
}

export async function POST(request: NextRequest) {
	const revalidationToken = request.headers.get('token');

	if (revalidationToken !== process.env.REVALIDATION_TOKEN) {
		return NextResponse.json({ revalidated: false, now: Date.now() });
	}

	const event: StrapiWebhook = await request.json();

	if (event.entry.slug) {
		revalidateTag(event.entry.slug as string);

		return NextResponse.json({ revalidated: true, now: Date.now() });
	}

	revalidateTag(event.model);

	return NextResponse.json({ revalidated: true, now: Date.now() });
}
