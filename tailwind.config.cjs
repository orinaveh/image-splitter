/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["business"],
  },
  theme: {
    fontFamily: {
      tama: ['KtivaTamaSquareMF', '"Open Sans"', 'Arial']
    }
  }
}
