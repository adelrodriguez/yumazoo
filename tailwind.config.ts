import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';
import FormsPlugin from '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        ui: ['Helvetica Neue', ...defaultTheme.fontFamily.sans],
        styled: ['Bai Jamjuree', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [FormsPlugin],
} satisfies Config;
