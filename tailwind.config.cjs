/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#dfedf0',
        secondary: '#01263f',
        'primary-dark': '#000c24',
        'secondary-dark': '#cce2eb',
        accent: '#ed8936'
      },
    },
  },
  plugins: [],
}
