/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#1E3A8A', // Primary Navy
          900: '#0F172A', // Dark Navy / Header
          950: '#0B1120',
        },
        brand: {
          blue: '#1E3A8A',
          hover: '#1D4ED8',
          light: '#EFF6FF',
          accent: '#0EA5E9',
        },
        status: {
          answered: '#10B981', // Green
          unanswered: '#EF4444', // Red
          marked: '#8B5CF6', // Purple
          reviewAnswered: '#6366F1', // Indigo
          notVisited: '#E2E8F0', // Light Gray
        }
      },
      fontFamily: {
        sans: ['Inter', 'Hind Siliguri', 'Noto Sans Bengali', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
