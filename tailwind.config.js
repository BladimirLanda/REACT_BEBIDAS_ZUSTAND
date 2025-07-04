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
      },
      animation: {
        blink: 'blink 1s ease-in-out infinite' //Animación personalizada de Parpadeo
      },
      keyframes: {
        blink: {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0.5'
          }
        }
      }
    },
  },
  plugins: [],
}

