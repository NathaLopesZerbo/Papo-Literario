/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        reddit_light: {
          DEFAULT: '#f4f4f4',
          brighter: '#CFCCCC',
        },
        input_search: {
          DEFAULT: '#9AB7D0',
        },
        fundo_search: {
          DEFAULT: '#95B3CC',
        },
        button_color: {
          DEFAULT: '#5E5CE6',
        },
        link_color:{
          DEFAULT: '#3498DB',
        },
        fundo_link:{
          DEFAULT: '#BDC3C7',
        },
        auth:{
          DEFAULT: '#2C3E50',
        },
        place:{
          DEFAULT: '#4D3F2D'
        },
        input:{
          DEFAULT: '#E6E6FA'
        }
      },
    },
  },
  plugins: [],
}
