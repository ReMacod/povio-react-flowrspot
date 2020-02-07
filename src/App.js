import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from './styles/theme'

import Flowers from './routes/Flowers'
import Sightings from './routes/Sightings'
import Favorites from './routes/Favorites'
import NotFound from './routes/NotFound'

import LayoutSwitcher from './layouts/Switcher'
import LayoutMain from './layouts/Main'

import PageHeader from './page/Header'
import PageMain from './page/Main'
import PageFooter from './page/Footer'

import store from './reducers/store'
import { reducer as loading } from './reducers/Loading'
import { reducer as flowers } from './reducers/Flowers'
import { reducer as user } from './reducers/User'

const state = {
  loading,
  flowers,
  user,
}

const routes = () => (
  <Switch>
    <Route path="/" exact component={Flowers} />
    <Route path="/flowers" exact component={Flowers} />
    <Route path="/sightings" exact component={Sightings} />
    <Route path="/favorites" exact component={Favorites} />
    {/* TODO: style 404 page */}
    <Route path="*" component={NotFound} />
  </Switch>
)

const layouts = {
  main: {
    layout: LayoutMain,
    components: {
      PageHeader,
      PageMain,
    },
  },
  '/flowers': {
    layout: LayoutMain,
    components: {
      PageHeader,
      PageMain,
      PageFooter,
    },
  },
}

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ReduxProvider store={store(state)}>
      <Router>
        <LayoutSwitcher routes={routes} layouts={layouts} main={layouts.main} />
      </Router>
    </ReduxProvider>
  </ThemeProvider>
)

export default App
