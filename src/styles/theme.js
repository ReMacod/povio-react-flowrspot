import { createMuiTheme } from '@material-ui/core/styles'

import colors from './colors.scss'

const { light, gray /*, orange */ } = colors

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
      sm: 800,
    },
  },
  palette: {
    background: {
      default: light,
    },
    primary: {
      // main: orange, // If this is used then tests fail
      main: '#e4988d',
      contrastText: light,
    },
    light: {
      main: light,
    },
    gray: {
      main: gray,
    },
  },
})

export default theme
