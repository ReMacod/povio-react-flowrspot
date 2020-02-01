import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import './style.sass'

import { fetchFlowers } from '../../reducers/Flowers'

const appClassName = classNames({
  Flowers: true,
})

const Flowers = ({ dispatch }) => {
  dispatch(fetchFlowers())

  return <div className={appClassName}>Flowers</div>
}

export default connect()(Flowers)
