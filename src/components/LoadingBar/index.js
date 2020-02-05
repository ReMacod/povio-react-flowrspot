import React from 'react'
import classNames from 'classnames'

import LinearProgress from '@material-ui/core/LinearProgress'

import './style.sass'

const className = classNames({
  LoadingBar: true,
})

const LoadingBar = ({ loading }) => {
  const { isLoading, isDisabled } = loading

  if (isDisabled) {
    return null
  }

  return <div className={className}>{isLoading && <LinearProgress />}</div>
}

export default LoadingBar
