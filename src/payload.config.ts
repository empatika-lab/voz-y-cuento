// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres';
import { buildConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/* Translations */
import { es } from '@payloadcms/translations/languages/es';

/* Collections */
import { Admin } from './collections/Admin';
import { Course } from './collections/Course';
import { Student } from './collections/Student';

export default buildConfig({
	admin: {
		user: Admin.slug,
	},
	collections: [Admin, Course, Student],
	cookiePrefix: 'vyc',
	editor: lexicalEditor(),
	i18n: {
		fallbackLanguage: 'es',
		supportedLanguages: { es },
	},
	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || '',
		},
	}),
	sharp,
	plugins: [
		// storage-adapter-placeholder
	],
});
