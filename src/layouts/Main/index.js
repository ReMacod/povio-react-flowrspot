import React from 'react'
import classNames from 'classnames'

import './style.sass'

const className = classNames({
  LayoutMain: true,
})

const LayoutMain = ({ routes, layout }) => {
  const { components } = layout
  const { PageHeader, PageMain, PageFooter } = components

  return (
    <div className={className}>
      {PageHeader && <PageHeader />}
      {PageMain && <PageMain routes={routes} />}
      {PageFooter && <PageFooter />}
    </div>
  )
}

export default LayoutMain
