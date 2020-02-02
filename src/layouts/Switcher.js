import React from 'react'
import { useLocation } from 'react-router-dom'

const LayoutSwitcher = ({ routes, layouts, default: LayoutDefault }) => {
  const location = useLocation()
  const Layout = layouts[location.pathname]

  if (Layout) {
    return <Layout routes={routes} />
  }

  return <LayoutDefault routes={routes} />
}

export default LayoutSwitcher
