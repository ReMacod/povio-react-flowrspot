import React from 'react'
import classNames from 'classnames'

import './style.sass'

const appClassName = classNames({
  Flowers: true,
})

const Flowers = () => <div className={appClassName}>Flowers</div>

export default Flowers
