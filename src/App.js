import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from './styles/theme'

import Flowers from './routes/Flowers'
import Sightings from './routes/Sightings'
import Favorites from './routes/Favorites'

import LayoutSwitcher from './layouts/Switcher'
import LayoutDefault from './layouts/Default'
import LayoutWithFooter from './layouts/WithFooter'

import store from './reducers/store'
import { reducer as loading } from './reducers/Loading'
import { reducer as flowers } from './reducers/Flowers'

const state = {
  loading,
  flowers,
}

const routes = () => (
  <Switch>
    <Route path="/" exact component={Flowers} />
    <Route path="/flowers" exact component={Flowers} />
    <Route path="/sightings" exact component={Sightings} />
    <Route path="/favorites" exact component={Favorites} />
    {/* TODO: style 404 page */}
    <Route path="*" component={() => <div>404</div>} />
  </Switch>
)

const layouts = {
  '/flowers': LayoutWithFooter,
}

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ReduxProvider store={store(state)}>
      <Router>
        <LayoutSwitcher routes={routes} layouts={layouts} default={LayoutDefault} />
      </Router>
    </ReduxProvider>
  </ThemeProvider>
)

export default App
