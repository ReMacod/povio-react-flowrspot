import { createMuiTheme } from '@material-ui/core/styles'

import colors from './colors.scss'

// If these commented colors are usedthen tests fail
const { light, gray /*, dark , orange */ } = colors

const dark = '#000000'
const orange = '#e4988d'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Ubuntu',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 1280,
      lg: 1920,
      xl: 2560,
    },
  },
  palette: {
    background: {
      default: light,
    },
    primary: {
      main: orange,
      contrastText: light,
    },
    secondary: {
      main: dark,
      contrastText: light,
    },
    light: {
      main: light,
    },
    dark: {
      main: dark,
    },
    gray: {
      main: gray,
    },
  },
})

export default theme
