import React from 'react'
import classNames from 'classnames'

import './style.sass'

const className = classNames({
  Main: true,
})

const Main = ({ routes }) => <main className={className}>{routes()}</main>

export default Main
