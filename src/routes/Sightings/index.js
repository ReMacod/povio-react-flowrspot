import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import './style.sass'

const className = classNames({
  Sightings: true,
})

const Sightings = ({ dispatch }) => {
  return <div className={className}>Sightings</div>
}

export default connect()(Sightings)
