import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import SettingsIcon from '@material-ui/icons/Settings'

const routesToActiveButton = {
  '/flowers': 0,
  '/favorites': 1,
  '/settings': 2,
}

export default function BottomNav() {
  const location = useLocation()
  const history = useHistory()

  return (
    <BottomNavigation value={routesToActiveButton[location.pathname]} showLabels>
      <BottomNavigationAction
        label="Latest Sightings"
        icon={<LocationOnIcon />}
        onClick={() => {
          history.push('/flowers')
        }}
      />

      <BottomNavigationAction
        label="Favorites"
        icon={<FavoriteIcon />}
        onClick={() => {
          history.push('/favorites')
        }}
      />

      <BottomNavigationAction
        label="Settings"
        icon={<SettingsIcon />}
        onClick={() => {
          history.push('/settings')
        }}
      />
    </BottomNavigation>
  )
}
