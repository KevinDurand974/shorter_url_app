/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin")

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#36393f",
				secondary: "#2f3136",
				tertiary: "#202225",
				accent: "#f72585",
				text: "#f6d9ff",
				muted: "#a788b1",
				"s-alt": "#292b2f",
				"t-alt": "#17171a",
				danger: "#e01e5a",
				success: "#3ae717",
				warning: "#fca903",
				"gradient-top": "#7209b7",
				"gradient-bottom": "#3a0ca3",
			},
			fontFamily: {
				dancing: ["Dancing Script", "cursive"],
				fredoka: ["Fredoka One", "cursive"],
				poppins: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [
		plugin(({ addUtilities, e }) => {
			const className = "caps"
			const values = {
				normal: "normal",
				inherit: "inherit",
				initial: "initial",
				unset: "unset",
				small: "small-caps",
				"all-small": "all-small-caps",
				petite: "petite-caps",
				"all-petite": "all-petite-caps",
				uni: "unicase",
				titling: "titling-caps",
			}
			const variants = ["responsive"]

			addUtilities(
				[
					Object.entries(values).map(([key, value]) => {
						return {
							[`.${e(`${className}-${key}`)}`]: {
								"font-variant-caps": value,
							},
						}
					}),
				],
				{ variants }
			)
		}),
	],
}
