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
    {Object.entries(messages.messages).map(([messageKey, message]) => (
      <Fragment key={messageKey}>{messageComponents[messageKey]}</Fragment>
    ))}
  </Fragment>
)

const redux = [
  ({ messages }) => ({
    messages,
  }),
]

export default connect(...redux)(MessageBar)
