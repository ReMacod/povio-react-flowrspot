import React from 'react'
import { connect } from 'react-redux'
import Alert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'

import { hideMessage } from '../../reducers/Messages'

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: 25,
  },
  grid: {
    marginRight: 25,
  },
  gridItem: {
    [theme.breakpoints.down('xs')]: {
      padding: '0 !important',
    },
  },
}))

const Message = ({ dispatch, messages, messageKey, content, actions = {}, alertProps }) => {
  const { messages: messageList } = messages
  const { isOpen } = messageList[messageKey]

  const handleClose = () => {
    dispatch(hideMessage({ messageKey }))
  }

  const styles = useStyles()
  const { root, grid, gridItem, actionButton } = styles

  return (
    <Collapse in={isOpen}>
      <Alert
        className={root}
        action={
          <Grid container spacing={3} className={grid}>
            {Object.entries(actions).map(([key, component]) => (
              <Grid key={key} item className={gridItem}>
                {component}
              </Grid>
            ))}

            <Grid item className={gridItem}>
              <IconButton
                className={actionButton}
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleClose}
              >
                OK
              </IconButton>
            </Grid>
          </Grid>
        }
        {...alertProps}
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
