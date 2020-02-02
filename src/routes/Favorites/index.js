import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import './style.sass'

// import { fetchFlowers } from '../../reducers/Flowers'

const className = classNames({
  Favorites: true,
})

const Favorites = ({ dispatch }) => {
  // dispatch(fetchFlowers())

  return <div className={className}>Favorites</div>
}

export default connect()(Favorites)
