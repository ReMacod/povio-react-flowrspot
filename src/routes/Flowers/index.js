import React, { useEffect } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import './style.sass'

import FlowerList from '../../components/FlowerList'

import { fetchFlowers } from '../../reducers/Flowers'

const className = classNames({
  Flowers: true,
})

const Flowers = ({ dispatch, flowers }) => {
  useEffect(() => {
    dispatch(fetchFlowers())
  }, [dispatch])

  console.log('flowers', flowers)

  return (
    <div className={className}>
      <FlowerList flowers={flowers} />
    </div>
  )
}

const redux = [
  ({ flowers }) => ({
    flowers,
  }),
]

export default connect(...redux)(Flowers)
