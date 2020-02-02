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

  const { flowers: flowerList } = flowers

  return (
    <div className={className}>
      <FlowerList flowers={flowerList} />
    </div>
  )
}

const redux = [
  ({ flowers }) => ({
    flowers,
  }),
]

export default connect(...redux)(Flowers)
