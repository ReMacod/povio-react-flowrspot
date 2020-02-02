import React from 'react'
import classNames from 'classnames'

import './style.sass'

import PageHeader from '../../components/PageHeader'
import PageMain from '../../components/PageMain'
import PageFooter from '../../components/PageFooter'

const className = classNames({
  LayoutWithFooter: true,
})

const LayoutWithFooter = ({ routes }) => (
  <div className={className}>
    <PageHeader />
    <PageMain routes={routes} />
    <PageFooter />
  </div>
)

export default LayoutWithFooter
