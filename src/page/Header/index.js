import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import AppBar from '../../components/AppBar'
import LoadingBar from '../../components/LoadingBar'
import MessageBar from '../../components/MessageBar'

const PageHeader = ({ loading }) => (
  <Fragment>
    <AppBar />
    <LoadingBar loading={loading} />

    <MessageBar />
  </Fragment>
)

const redux = [
  ({ loading }) => ({
    loading,
  }),
]

export default connect(...redux)(PageHeader)
