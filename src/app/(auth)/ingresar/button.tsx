import configPromise from '@payload-config';
import Button from '@/components/Button';

import { getPayloadHMR } from '@payloadcms/next/utilities';

export async function AuthButton() {
	const payload = await getPayloadHMR({
		config: configPromise,
	});

	const courses = await payload.login({
		collection: 'students',
		data: {
			email: 'dusantadicdusan@gmail.com',
			password: '12peces',
		},
	});

	// eslint-disable-next-line no-console
	console.log(courses);

	return <Button>INGRESAR</Button>;
}
