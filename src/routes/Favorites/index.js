import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import './style.sass'

const className = classNames({
  Favorites: true,
})

const Favorites = ({ dispatch }) => {
  return <div className={className}>Favorites</div>
}

export default connect()(Favorites)
