/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}", // Isso faz o Tailwind 'ler' todos os seus componentes
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B786D',
        secondary: '#D9C7B8',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'raleway': ['Raleway', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

