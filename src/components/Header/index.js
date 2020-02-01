import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import './style.sass'

const appClassName = classNames({
  Header: true,
})

const Header = () => (
  <header className={appClassName}>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/flowers">Flowers</Link>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header
