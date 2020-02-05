import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import './style.sass'

const PageMain = ({ routes, loading }) => {
  const { isLoading, isEnding, isMinimal, isDisabled } = loading

  const overlay =
    isMinimal || isDisabled
      ? {}
      : {
          Overlay: isLoading || isEnding,
          OverlayShow: isLoading,
          OverlayFade: isEnding,
        }

  const className = classNames({
    PageMain: true,
    ...overlay,
  })

  return <main className={className}>{routes()}</main>
}

const redux = [
  ({ loading }) => ({
    loading,
  }),
]

export default connect(...redux)(PageMain)
