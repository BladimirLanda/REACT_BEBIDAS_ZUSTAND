/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  //Variables de tema - Gestión de clases de utilidad
  theme: {
    extend: {
      backgroundImage: {
        //bg-opción*
        "header" : "url('/bg.jpg')"
      }
    },
  },
  plugins: [],
}

