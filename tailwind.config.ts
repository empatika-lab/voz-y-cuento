import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			text: {
				'main-title': 'text-[48px] lg:text-[96px] leading-[130%] tracking-[2%] lg:tracking-[4%]',
				'emphasized-md': 'text-[64px] leading-[120%] tracking-[3%]',
			},
			boxShadow: {
				'3xl': '2px 2px 0 0 #031926;',
				'4xl': '0px 2px 6px 0px rgba(9, 76, 77, 0.20);',
				pink: '0px -2px 6px 0px rgba(119, 29, 21, 0.20);',
			},
			backgroundImage: {
				'gradient-2': 'linear-gradient(90deg, #B6E8E9 0%, #FEF4F4 37%, #F9C7CA 95%)',
				'gradient-3': 'linear-gradient(0.11deg, #E8F8F8 0.1%, rgba(232, 248, 248, 0.21) 101.24%)',
				'gradient-4':
					'linear-gradient(180deg, rgba(232, 248, 248, 0.28) 0%, rgba(232, 248, 248, 0.8) 31.99%, rgba(232, 248, 248, 0.8) 67.67%, rgba(232, 248, 248, 0.28) 100%)',
				'gradient-diamond': 'linear-gradient(180deg, rgba(15,129,131,1) 0%, rgba(9,76,77,1) 100%)',
			},
			colors: {
				cyan: {
					25: '#f8fdfd',
					50: '#e8f8f8',
					100: '#b6e8e9',
					200: '#93ddde',
					300: '#62cecf',
					400: '#44c5c6',
					500: '#15b6b8',
					600: '#13a6a7',
					700: '#0f8183',
					800: '#0c6465',
					900: '#094c4d',
				},
				grey: {
					300: '#ABB9B9',
					900: '#373F3F',
					950: '#171A1A',
				},
				pink: {
					25: '#fffafa',
					50: '#fef4f4',
					100: '#fbdedc',
					200: '#f9cecb',
					300: '#f6b8b3',
					400: '#f5aaa4',
					500: '#f2958d',
					600: '#dc8880',
					700: '#ac6a64',
					800: '#85524e',
					900: '#663f3b',
				},
				red: {
					600: '#D44545',
					700: '#A53636',
				},
			},
			container: {
				center: true,
				screens: {
					sm: '640px',
					md: '768px',
					lg: '1024px',
					xl: '1132px',
					'2xl': '1132px',
				},
				padding: {
					DEFAULT: '20px',
					lg: '32px',
					xl: '0px',
				},
			},
			fontFamily: {
				sans: 'var(--font-sans)',
				display: 'var(--font-display)',
			},
			keyframes: {
				shimmer: {
					'0%': { backgroundPosition: '100% 0' },
					'100%': { backgroundPosition: '-100% 0' },
				},
				slideDown: {
					from: { height: '0px' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				slideUp: {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0px' },
				},
			},
			animation: {
				shimmer: 'shimmer 2s linear infinite',
				slideDown: 'slideDown 250ms ease-out',
				slideUp: 'slideUp 250ms ease-in',
			},
			perspective: {
				'1000': '1000px',
			},
			rotate: {
				'y-180': '180deg',
			},
			transformStyle: {
				'preserve-3d': 'preserve-3d',
			},
			backfaceVisibility: {
				hidden: 'hidden',
			},
		},
	},
	variants: {
		extend: {
			backfaceVisibility: ['hover', 'group-hover'],
		},
	},
	plugins: [],
} satisfies Config;
