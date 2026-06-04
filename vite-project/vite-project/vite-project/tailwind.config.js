/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#00C853',
          'green-dark': '#00A544',
          'green-light': '#E8F5E9',
          teal: '#E0F7FA',
          accent: '#E8EAF6',
          text: '#212121',
          muted: '#757575',
          error: '#F44336',
          warning: '#FFC107',
          success: '#4CAF50',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F7F8FA',
          tertiary: '#EEF0F4',
          dark: '#1A1D27',
          card: '#FFFFFF',
        },
        dark: {
          bg: '#0F1117',
          surface: '#1A1D27',
          card: '#222636',
          border: '#2E3348',
          text: '#E2E8F0',
          muted: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
        'card': '0 0 0 1px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 24px -4px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)',
        'green': '0 4px 14px 0 rgba(0, 200, 83, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideInRight: { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
        slideUp: { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        bounceSubtle: { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.04)' } },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}