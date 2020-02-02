import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import LinearProgress from '@material-ui/core/LinearProgress'

import './style.sass'

const className = classNames({
  LoadingBar: true,
})

const LoadingBar = ({ loading }) => (
  <div className={className}>{loading.isLoading && <LinearProgress />}</div>
)

const redux = [
  ({ loading }) => ({
    loading,
  }),
]

export default connect(...redux)(LoadingBar)
