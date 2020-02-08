import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import { messageComponents } from '../../reducers/Messages'

export const useStyles = makeStyles(theme => ({
  alert: {
    backgroundColor: theme.palette.success.main,
    borderRadius: 0,
    borderTop: '1px solid',
  },
}))

const MessageBar = ({ messages }) => (
  <Fragment>
    {Object.entries(messages.messageKeys).map(
      ([key, isActive]) => isActive && <Fragment key={key}>{messageComponents[key]}</Fragment>
    )}
  </Fragment>
)

const redux = [
  ({ messages }) => ({
    messages,
  }),
]

export default connect(...redux)(MessageBar)
