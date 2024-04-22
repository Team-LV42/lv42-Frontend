/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      "noto" : ['Noto Sans KR', 'sans-serif'],
      "outfit" : ['Outfit', 'sans-serif']
    },
    extend: {
      animation: {
        shake: 'shake .5s ease-in-out infinite'
      },
      keyframes: {
        shake: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-2.5px)' },
          '100%': { transform: 'translateX(0)' }
        }
      },
      screens: {
        'pointerhover': {
          'raw': "(hover:hover) and (pointer:fine)"
        }
      },
      backgroundImage: {
        'logo': "url('../public/logo/logo.svg')",
        'logo-hazy': "url('../public/logo/logo-darkened.svg')",
        'default': "url('../public/background.svg')",
        'default-desktop': "url('../public/background-desktop.svg')",
        'xbox': "url('../public/xbox.png')",
        'switch': "url('../public/switch.png')",
        'ps5': "url('../public/ps5.png')",
        'controller-icon': "url('../public/controller-icon2.svg')",
        'ps5-btn-info': "url('../public/ps5-button-info2.png')",
        'switch-btn-info': "url('../public/switch-button-info.png')",
        'switch-pro-btn-info': "url('../public/switch-pro-button-info.png')",
        'xbox-btn-info': "url('../public/xbox-button-info.png')"
      }
    },
  },
  plugins: [],
}

