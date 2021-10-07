import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'

export default defineConfig({
  darkMode: 'class',
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: true,
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '@responsive ': {
          '.column-count-2': {
            'column-count': '2',
            'column-gap': '0.5rem',
          },
          '.column-count-3': {
            'column-count': '3',
            'column-gap': '0.5rem',
          },
        },
        '.column-count-2': {
          'column-count': '2',
          'column-gap': '0.5rem',
        },

        '.column-count-3': {
          'column-count': '3',
          'column-gap': '0.5rem',
        },
      })
    }),
  ],
})
