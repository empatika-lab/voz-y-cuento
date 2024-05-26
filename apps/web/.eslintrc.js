module.exports = {
	extends: ['next/core-web-vitals'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	ignorePatterns: ['next.config.js'],
	rules: {
		'react/jsx-sort-props': [
			1,
			{
				callbacksLast: true,
				shorthandFirst: false,
				noSortAlphabetically: false,
				reservedFirst: true,
			},
		],
	},
};
