import React from 'react'
import classNames from 'classnames'

import './style.sass'

const className = classNames({
  NotFound: true,
})

const NotFound = () => <div className={className}><div>Page not found</div></div>

export default NotFound
