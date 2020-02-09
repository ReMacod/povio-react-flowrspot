import React from 'react'
import { connect } from 'react-redux'
import Alert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'

import { hideMessage } from '../../reducers/Messages'

// NEXT: Fix OK PROFILE grid

const Message = ({ dispatch, messages, messageKey, content, actions = {}, alertProps }) => {
  const { messages: messageList } = messages
  const { isOpen } = messageList[messageKey]

  const handleClose = () => {
    dispatch(hideMessage({ messageKey }))
  }

  return (
    <Collapse in={isOpen}>
      <Alert
        {...alertProps}
        action={
          <Grid container spacing={3}>
            {Object.entries(actions).map(([key, component]) => (
              <Grid key={key} item>
                {component}
              </Grid>
            ))}

            <Grid item>
              <IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}>
                OK
              </IconButton>
            </Grid>
          </Grid>
        }
      >
        {content}
      </Alert>
    </Collapse>
  )
}

const redux = [
  ({ messages }) => ({
    messages,
  }),
]

export default connect(...redux)(Message)
