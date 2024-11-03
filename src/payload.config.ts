// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import sharp from 'sharp';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';

import { Admin } from './payload/collections/Admin';
import { Media } from './payload/collections/Media';
import { Event } from './payload/collections/Event';
import { Course } from './payload/collections/Course';
import { Student } from './payload/collections/Student';
import { PendingPayments } from './payload/collections/PendingPayments';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/* Translations */
import { es } from '@payloadcms/translations/languages/es';
import { en } from '@payloadcms/translations/languages/en';

/* Uploads */
import { uploadthingStorage } from '@payloadcms/storage-uploadthing';

export default buildConfig({
	admin: {
		user: Admin.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Admin, Course, Media, Event, Student, PendingPayments],
	cookiePrefix: 'vycadmin',
	editor: lexicalEditor(),
	i18n: {
		fallbackLanguage: 'es',
		supportedLanguages: { es, en },
	},
	secret: process.env.PAYLOAD_SECRET ?? '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI ?? '',
		},
	}),
	sharp,
	upload: {
		limits: {
			fileSize: 5000000,
		},
	},
	plugins: [
		uploadthingStorage({
			collections: {
				[Media.slug]: true,
			},
			options: {
				apiKey: process.env.UPLOADTHING_SECRET,
				acl: 'public-read',
			},
		}),
	],
});
