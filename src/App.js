import React from 'react'
import classNames from 'classnames'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import './App.sass'

import Home from './routes/Home'
import Flowers from './routes/Flowers'

import LayoutSwitcher from './layouts/Switcher'
import DefaultLayout from './layouts/Default'
import FullLayout from './layouts/Full'

import store from './reducers/store'
import { reducer as flowers } from './reducers/Flowers'

const routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/flowers" exact component={Flowers} />
  </Switch>
)

const layouts = {
  '/flowers': FullLayout,
}

const state = {
  flowers,
}

const appClassName = classNames({
  App: true,
})

const App = () => (
  <div className={appClassName}>
    <Provider store={store(state)}>
      <Router>
        <LayoutSwitcher layouts={layouts} routes={routes} DefaultLayout={DefaultLayout} />
      </Router>
    </Provider>
  </div>
)

export default App
