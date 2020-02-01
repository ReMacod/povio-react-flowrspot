import React from 'react'
import classNames from 'classnames'

import './style.sass'

import Header from '../../components/Header'
import Main from '../../components/Main'

const appClassName = classNames({
  DefaultLayout: true,
})

const DefaultLayout = ({ routes }) => (
  <div className={appClassName}>
    <Header />
    <Main routes={routes} />
  </div>
)

export default DefaultLayout
