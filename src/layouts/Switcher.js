import React from 'react'
import { useLocation } from 'react-router-dom'

const LayoutSwitcher = ({ layouts, routes, DefaultLayout }) => {
  const location = useLocation()
  const Layout = layouts[location.pathname]

  if (Layout) {
    return <Layout routes={routes} />
  }

  return <DefaultLayout routes={routes} />
}

export default LayoutSwitcher
