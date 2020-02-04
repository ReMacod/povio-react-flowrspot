import React from 'react'
import classNames from 'classnames'

import './style.sass'

import BottomNav from '../../components/BottomNav'

const className = classNames({
  PageFooter: true,
})

const PageFooter = ({ routes }) => (
  <footer className={className}>
    <BottomNav />
  </footer>
)

export default PageFooter
