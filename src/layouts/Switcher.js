import React from 'react'
import { useLocation } from 'react-router-dom'

const LayoutSwitcher = ({ routes, layouts, main }) => {
  const location = useLocation()

  const layout = layouts[location.pathname]

  if (layout) {
    const { layout: Layout } = layout
    return <Layout routes={routes} layout={layout} />
  }

  const { layout: LayoutMain } = main
  return <LayoutMain routes={routes} layout={main} />
}

export default LayoutSwitcher
