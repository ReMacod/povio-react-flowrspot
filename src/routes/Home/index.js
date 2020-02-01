import React from 'react'
import classNames from 'classnames'

import './style.sass'

const appClassName = classNames({
  Home: true,
})

const Home = () => <div className={appClassName}>Flowrspot</div>

export default Home
