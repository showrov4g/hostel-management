/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      background_image:{
        'bgImage': 'url("./src/assets/header_img.png")' 
      }
    },
  },
  plugins: [require('daisyui')],
}
