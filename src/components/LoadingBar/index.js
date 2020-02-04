import React from 'react'
import classNames from 'classnames'

import LinearProgress from '@material-ui/core/LinearProgress'

import './style.sass'

const className = classNames({
  LoadingBar: true,
})

const LoadingBar = ({ loading }) => (
  <div className={className}>{loading.isLoading && <LinearProgress />}</div>
)

export default LoadingBar
