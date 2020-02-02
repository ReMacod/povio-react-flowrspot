import React from 'react'
import classNames from 'classnames'

import './style.sass'

const className = classNames({
  PageMain: true,
})

const PageMain = ({ routes }) => <main className={className}>{routes()}</main>

export default PageMain
