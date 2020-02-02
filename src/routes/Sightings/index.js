import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import './style.sass'

// import { fetchFlowers } from '../../reducers/Flowers'

const className = classNames({
  Sightings: true,
})

const Sightings = ({ dispatch }) => {
  // dispatch(fetchFlowers())

  return <div className={className}>Sightings</div>
}

export default connect()(Sightings)
