/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}", // lê todos os componentes
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A0522D',
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


 
/*  primary: '#A0522D',
    secondary: '#008080', */

    /*  primary: '#8B786D',
        secondary: '#D9C7B8', */