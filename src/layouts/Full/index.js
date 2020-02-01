import React from 'react'
import classNames from 'classnames'

import './style.sass'

const appClassName = classNames({
  FullLayout: true,
})

const FullLayout = ({ routes }) => <div className={appClassName}>{routes()}</div>

export default FullLayout
