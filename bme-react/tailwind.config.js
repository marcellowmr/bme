/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#f7f6f3',
        surface: '#ffffff',
        's2':    '#efede8',
        blue:  { DEFAULT: '#1351b4', dk: '#0c2340', lt: '#eff4ff', mid: '#c7d9f8' },
        warm:  { 3: '#a0a09a', 2: '#52525b', 1: '#18181b', g: '#78746e' },
        grn:   { DEFAULT: '#166534', lt: '#f0fdf4', mid: '#bbf7d0' },
        amb:   { DEFAULT: '#92400e', lt: '#fff3e0', mid: '#fcd34d' },
        ai:    { DEFAULT: '#7c3aed', lt: '#f5f3ff', mid: '#ddd6fe' },
      },
      borderColor: { DEFAULT: 'rgba(0,0,0,0.07)' },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,.06), 0 0 0 1px rgba(0,0,0,.05)',
        md: '0 4px 16px rgba(0,0,0,.09), 0 0 0 1px rgba(0,0,0,.04)',
        lg: '0 8px 32px rgba(0,0,0,.13), 0 0 0 1px rgba(0,0,0,.05)',
      },
      borderRadius: { xl: '12px', '2xl': '16px', '3xl': '20px' },
    },
  },
  plugins: [],
}
