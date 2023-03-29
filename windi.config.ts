import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'

export default defineConfig({
  darkMode: 'class',
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: true,
  theme: {
    extend: {
      screens: {
        '4xl': '2000px',
        '5xl': '2300px',
      },
      textShadow: {
        border: '0px 0px 1px rgb(0 0 0 / 60%)',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.column-gap': {
          'column-gap': '0.5rem',
        },
      })
      addUtilities({
        '.column-count-auto': {
          'column-count': 'auto',
          'column-width': '400px',
          'column-gap': '0.5rem',
        },
      })
    }),
    plugin(({ addDynamic, variants }) => {
      addDynamic('column-count', ({ Utility, Style }) => {
        return Utility.handler
          .handleStatic(Style('column-count'))
          .handleNumber(2, 10, 'int', number => ` ${number}`)
          .createProperty('column-count')
      }, variants('column-count'))
    }),
  ],
})
