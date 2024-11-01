/** @type {import('eslint').Linter.Config} */
module.exports = {
	extends: [
		'next/core-web-vitals',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'prettier',
	],
	parserOptions: {
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname,
	},
	rules: {
		'consistent-return': 'warn',
		'@typescript-eslint/no-unsafe-member-access': 'warn',
		'@typescript-eslint/no-unsafe-assignment': 'warn',
		'@typescript-eslint/no-misused-promises': 'warn',
		'@typescript-eslint/consistent-type-definitions': 'warn',
		'no-console': 'error',
		// 'no-param-reassign': [
		// 	'error',
		// 	{ props: true, ignorePropertyModificationsForRegex: ['^state'] },
		// ],
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/ban-tslint-comment': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			},
		],
	},
};
