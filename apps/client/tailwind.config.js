/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin")

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
		"./src/libs/**/*.{js,ts,jsx,tsx}",
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
		plugin(({ theme, addBase, e }) => {
			const colors = theme("colors")

			const varName = "--sfx-border-gradient"
			const className = ".border-gradient"

			let colorVars = {}

			const hex2rgba = (hex, alpha = 100) => {
				if (["currentColor", "transparent", "inherit"].includes(hex)) return hex
				const rHex = hex.substring(1)
				let split = []
				if (/^([A-Z0-9]{2}){3}$/gi.test(rHex)) {
					split = rHex.match(/[A-Z0-9]{2}/gi).map((c) => parseInt(c, 16))
				} else if (/^([A-Z0-9]{1}){3}$/gi.test(rHex)) {
					split = rHex.match(/[A-Z0-9]{1}/gi).map((c) => parseInt(c + c, 16))
				}
				const [r, g, b] = split
				if (alpha === 100) return `rgb(${r} ${g} ${b})`
				return `rgb(${r} ${g} ${b} / ${alpha / 100})`
			}

			const createColorObj = (color, name) => {
				const obj = {}
				// With /opacity
				for (let i = 0; i <= 100; i += 10) {
					obj[`${className}-from-${name}${e("/")}${i}`] = {
						[`${varName}-from`]: hex2rgba(color, i),
						[`${varName}-stops`]: `var(${varName}-from), var(${varName}-to)`,
					}
					obj[`${className}-to-${name}${e("/")}${i}`] = {
						[`${varName}-to`]: hex2rgba(color, i),
					}
				}
				// With border-opacity
				obj[`${className}-from-${name}`] = {
					[`${varName}-from`]: hex2rgba(color, 100),
					[`${varName}-stops`]: `var(${varName}-from), var(${varName}-to)`,
				}
				obj[`${className}-to-${name}`] = {
					[`${varName}-to`]: hex2rgba(color, 100),
				}
				return obj
			}

			Object.keys(colors).forEach((name) => {
				if (typeof colors[name] === "string") {
					if (["currentColor", "transparent", "inherit"].includes(name)) {
						colorVars[`${className}-to-${name}`] = {
							[`${varName}-to`]: colors[name],
						}
					} else {
						colorVars = { ...colorVars, ...createColorObj(colors[name], name) }
					}
				} else {
					Object.keys(colors[name]).forEach((shade) => {
						colorVars = {
							...colorVars,
							...createColorObj(colors[name][shade], `${name}-${shade}`),
						}
					})
				}
			})

			// All treated colors
			addBase(
				{
					"*, ::before, ::after": {
						[`${varName}-from`]: "",
						[`${varName}-to`]: "",
						[`${varName}-stops`]: `var(${varName}-from), var(${varName}-to)`,
					},
					...colorVars,
				},
				{ variants: ["responsive"] }
			)

			// All linear gradient type
			addBase(
				{
					[`${className}-to-t`]: {
						"border-image": `linear-gradient(to top, var(${varName}-stops)) 1`,
					},
					[`${className}-to-tr`]: {
						"border-image": `linear-gradient(to top right, var(${varName}-stops)) 1`,
					},
					[`${className}-to-tl`]: {
						"border-image": `linear-gradient(to top left, var(${varName}-stops)) 1`,
					},
					[`${className}-to-r`]: {
						"border-image": `linear-gradient(to right, var(${varName}-stops)) 1`,
					},
					[`${className}-to-b`]: {
						"border-image": `linear-gradient(to bottom, var(${varName}-stops)) 1`,
					},
					[`${className}-to-br`]: {
						"border-image": `linear-gradient(to bottom right, var(${varName}-stops)) 1`,
					},
					[`${className}-to-bl`]: {
						"border-image": `linear-gradient(to bottom left, var(${varName}-stops)) 1`,
					},
					[`${className}-to-l`]: {
						"border-image": `linear-gradient(to left, var(${varName}-stops)) 1`,
					},
				},
				{ variants: ["responsive"] }
			)
		}),
	],
}
