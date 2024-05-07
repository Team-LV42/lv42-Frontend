/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      "noto" : ['Noto Sans KR', 'sans-serif'],
      "outfit" : ['Outfit', 'sans-serif'],
      "Bolwby-One" : ['Bowlby One SC', 'sans-serif']
    },
    extend: {
      boxShadow: {
        'basic': 'inset 0px -4px rgba(0, 0, 0, 0.1)',
        'selected' : 'inset 0px 4px 1px rgba(0, 0, 0, 0.4)',
        'not-selected' : 'inset 0px -4px 1px rgba(0, 0, 0, 0.4)',
        'modal': '4px 4px 4px 1px rgba(0, 0, 0, 0.25)'
      },
      animation: {
        shake: 'shake .5s ease-in-out'
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
        },
        'mobile' : {
          'raw': "(hover:none)"
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
        'ps5-btn-info': "url('../public/ps5-button-info.png')",
        'switch-btn-info': "url('../public/switch-button-info.png')",
        'switch-pro-btn-info': "url('../public/switch-pro-button-info.png')",
        'xbox-btn-info': "url('../public/xbox-button-info.png')",
        'user-onboarding-2': "url('../public/user-onboarding-2.png')",
        'user-onboarding-3': "url('../public/user-onboarding-3.png')",
        'user-onboarding-4': "url('../public/user-onboarding-4.png')",
        'user-onboarding-1': "url('../public/user-onboarding-1.png')",
        'error-404': "url('../public/error-background-404.svg')",
        'error-404-desktop': "url('../public/error-background-404-desktop.svg')",
        'error-500': "url('../public/error-background-500.svg')",
        'error-500-desktop': "url('../public/error-background-500-desktop.svg')",
        'xbox-controller': "url('../public/xbox-controller.png')",
        'switch-controller': "url('../public/switch-controller.png')",
        'ps5-controller': "url('../public/ps5-controller.png')",
      }
    },
  },
  plugins: [],
}

