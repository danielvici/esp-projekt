/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'Inter', 'sans-serif'],
      },
      gridTemplateRows: {
        '70/30': '70% 28%'
      },
        width: {
          '100p': '100%',
          '200p': '200%',
          '300p': '300%',
          '400p': '400%',
          '500p': '500%',
          '600p': '600%',
        },
        padding: {
            '35p':  '30.825%',
        }
    },
      plugins: ['tailwind-scrollbar', 'tailwind-scrollbar-hide'],
      colors: {
        'logo-farbe-lila': '#5500a2',
        'logo-farbe-rot': '#a2002b',
        'logo-farbe-blau': '#0b1074',
        'weiss': '#ffffff',
        'hintergrund-farbe': '#030a0c',
        'button-farbe': '#00c0ff',
        'schwarz': '#000000',
        'grau-dunkel': '#1c1c1c',
        'grau': '#404040',
        'grau2': '#828487',
        'grau-hell': '#a29e9e',
        'grau-hell2': '#d5d3d3',
    }
  },
 variants: {
    extend: {},
 },
};

