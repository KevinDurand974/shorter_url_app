/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"bg-primary": "#2C345D",
				"bg-secondary": "#141727",
				primary: "#7b9ff1",
				accent: "#be7bf1",
				secondary: "#7bcbf1",
			},
		},
	},
	plugins: [],
}
