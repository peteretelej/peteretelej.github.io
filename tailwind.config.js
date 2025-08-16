export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#3273dc',
          700: '#2366d1',
          800: '#1e3c72',
          900: '#1e293b',
        },
        code: {
          bg: '#1e1e1e',
          text: '#a93226',
        },
        warning: '#fffacd',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Comfortaa', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },
      boxShadow: {
        'inset-lg': 'inset 0px 5px 15px rgba(171, 171, 171, 0.5)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #3273dc 0%, #2366d1 100%)',
        'hero-gradient-dark': 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      },
    },
  },
}