import React, { useEffect } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import './style.sass'

import FlowerList from '../../components/FlowerList'
import FlowerSearch from '../../components/FlowerSearch'

import { listFlowers } from '../../reducers/Flowers'
import { searchFlowers } from '../../reducers/Flowers'

const mainClassName = classNames({
  Flowers: true,
})

const heroClassName = classNames({
  FlowersHero: true,
})

const Flowers = ({ dispatch, flowers }) => {
  const handleSearch = ({ query }) => {
    dispatch(searchFlowers({ query }))
  }

  useEffect(() => {
    dispatch(listFlowers())
  }, [dispatch])

  const { flowers: flowerList } = flowers

  return (
    <div className={mainClassName}>
      <div className={heroClassName}>
        <h2>Discover flowers around you</h2>
        <p>Explore between more than 8.427 sightings</p>
        <FlowerSearch onSearch={handleSearch} />
      </div>

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
