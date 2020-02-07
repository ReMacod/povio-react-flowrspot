import React, { useEffect } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import './style.sass'

import FlowerList from '../../components/FlowerList'
import FlowerSearch from '../../components/FlowerSearch'

import { listFlowers, searchFlowers } from '../../reducers/Flowers'
import { listSightings } from '../../reducers/Sightings'

const mainClassName = classNames({
  Flowers: true,
})

const heroClassName = classNames({
  FlowersHero: true,
})

const Flowers = ({ dispatch, flowers, sightings, user }) => {
  const handleSearch = ({ query }) => {
    dispatch(searchFlowers({ query }))
  }

  useEffect(() => {
    dispatch(listFlowers()).catch(error => {
      console.log('Flowers listFlowers error', error)
    })
    dispatch(listSightings()).catch(error => {
      console.log('Flowers listSightings error', error)
    })
  }, [dispatch])

  const { flowers: flowerList } = flowers
  const { sightings: sightingsList } = sightings
  const { user: userProfile } = user

  return (
    <div className={mainClassName}>
      <div className={heroClassName}>
        <h2>Discover flowers around you</h2>
        <p>Explore between more than {sightingsList.length} sightings</p>
        <FlowerSearch onSearch={handleSearch} />
      </div>

      <FlowerList flowers={flowerList} isLoggedIn={!!userProfile} />
    </div>
  )
}

const redux = [
  ({ flowers, sightings, user }) => ({
    flowers,
    sightings,
    user,
  }),
]

export default connect(...redux)(Flowers)
