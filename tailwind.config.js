/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Montserrat', 'sans-serif'],
				heading: ['Unbounded', 'sans-serif']
			},
			colors: {
				primary: {
					light: 'rgb(79, 70, 229)',
					dark: 'rgb(99, 102, 241)'
				},
				secondary: {
					light: 'rgb(139, 92, 246)',
					dark: 'rgb(236, 72, 153)'
				},
				accent: 'rgb(244, 63, 94)'
			}
		}
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require('@tailwindcss/forms')]
};
