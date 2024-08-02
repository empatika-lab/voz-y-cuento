// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres';
import { buildConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/* Utils */
import { cachedPayloadPlugin } from './lib/utils/api';

/* Uploads */
import { uploadthingStorage } from '@payloadcms/storage-uploadthing';

/* Translations */
import { es } from '@payloadcms/translations/languages/es';

/* Collections */
import { Admin } from './collections/Admin';
import { Course } from './collections/Course';
import { Media } from './collections/Media';
import { Student } from './collections/Student';

export default buildConfig({
	admin: {
		user: Admin.slug,
	},
	collections: [Admin, Course, Media, Student],
	cookiePrefix: 'vyc',
	editor: lexicalEditor(),
	i18n: {
		fallbackLanguage: 'es',
		supportedLanguages: { es },
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
			fileSize: 5000000, // 5MB
		},
	},
	plugins: [
		cachedPayloadPlugin,
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
