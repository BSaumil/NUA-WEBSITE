/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        // NUA ivory + burgundy design system.
        //
        // The brand icon keeps its original multicolour palette, so orange,
        // purple, pink and coral remain here — but as ICON tints only, used at
        // low opacity behind line icons. They are no longer surface or accent
        // colours anywhere in the shell.
        nua: {
          // Grounds
          bg: '#FAF8F3',
          bgAlt: '#F8F4ED',
          surface: '#FFFDF9',
          white: '#FFFFFF',

          // Brand
          burgundy: '#750D28',
          burgundyDark: '#5F1A23',
          burgundyBright: '#8A1433',
          burgundyWash: '#F5ECEA',

          // Type
          ink: '#29241E',
          ink2: '#655D53',
          // The approved --nua-text-muted (#8D847D) measures 3.45:1 on the
          // ivory ground and 3.61:1 on card surfaces, short of the 4.5:1 AA
          // needs for normal text. It is kept as `mutedSoft` for decorative
          // use, and `muted` is the same hue darkened to clear AA. Step 14 of
          // the brief asks for confirmed contrast, and that cannot be met with
          // the lighter value on running text.
          muted: '#756D67',
          mutedSoft: '#8D847D',

          // Lines
          border: '#E8DED4',
          borderStrong: '#D9CFC5',
          // Where a border is the only thing marking a control (inputs), it is
          // a UI component and needs 3:1, which #D9CFC5 (1.51:1) does not meet.
          borderControl: '#9A928B',

          // Dark sections, used sparingly
          dark: '#29241E',
          darkText: '#FAF8F3',
          darkBody: '#D9D1C8',
          // Approved accent #A94A62 is 2.81:1 on #29241E. Lightened to clear AA.
          darkAccent: '#E26383',

          // Icon tints from the brand icon. Low-saturation use only.
          orange: '#f58c14',
          purple: '#8b5cf6',
          pink: '#ec4899',
          coral: '#f97362',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          popover: 'hsl(var(--popover-foreground))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
