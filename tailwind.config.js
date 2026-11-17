/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        burgundy: { DEFAULT: '#641E32', 50: '#FBF0F3', 100: '#F5D6DE', 200: '#E9ACBD', 300: '#DD839C', 400: '#D1597B', 500: '#641E32', 600: '#8B2A46', 700: '#641E32', 800: '#4A1625', 900: '#3B1022' },
        wine: { DEFAULT: '#3B1022', light: '#4A1625', dark: '#2A0B18' },
        champagne: { DEFAULT: '#D6AD60', 50: '#FDF9F0', 100: '#F9EED5', 200: '#F0DBAB', 300: '#E7C881', 400: '#D6AD60', 500: '#C49A3D', 600: '#A47F2F', 700: '#7E6124', 800: '#584419', 900: '#32270E' },
        cream: { DEFAULT: '#FAF5EC', dark: '#F0E8D8' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { opacity: '0', transform: 'translateY(-20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideRight: { '0%': { opacity: '0', transform: 'translateX(-30px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.9)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        pulseGlow: { '0%, 100%': { boxShadow: '0 0 20px rgba(214,173,96,0.3)' }, '50%': { boxShadow: '0 0 40px rgba(214,173,96,0.6)' } },
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(31,38,135,0.07)',
        'gold': '0 4px 20px rgba(214,173,96,0.3)',
        'burgundy': '0 4px 20px rgba(100,30,50,0.3)',
      },
    },
  },
  plugins: [],
}
