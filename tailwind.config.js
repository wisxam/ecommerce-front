/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				bounceIn: {
					'0%, 100%': { transform: 'scale(0)' },
					'50%': { transform: 'scale(1)' },
				},
			},
			animation: {
				bounceIn: 'bounceIn 0.3s ease-in-out',
			},
		},
	},
	plugins: [],
};
