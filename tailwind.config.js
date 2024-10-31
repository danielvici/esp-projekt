/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'Inter', 'sans-serif'],
      },
      gridTemplateRows: {
        '70/30': '70% 28%'
      },
    },
    colors: {
        'logo-farbe-lila': '#5500a2',
        'logo-farbe-rot': '#a2002b',
        'logo-farbe-blau': '#0b1074',
        'weiss': '#ffffff',
        'schwarz': '#000000',
        'grau': '#404040',
        'grau-dunkel': '#1c1c1c',
        'grau-hell': '#a29e9e',
        'grau-hell2': '#d5d3d3',
    }
  },
 variants: {
    extend: {},
 },
};

