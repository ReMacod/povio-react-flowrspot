import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import Fab from '@material-ui/core/Fab'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Alert from '@material-ui/lab/Alert'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

import { makeStyles } from '@material-ui/core/styles'

import SignupForm from '../SignupForm'

import { signupUserAndUserInfo } from '../../reducers/User'

import { formatError } from '../../utils/Error'

const useStyles = makeStyles(theme => ({
  fabButton: {
    textTransform: 'none',
    paddingLeft: '1.5rem !important',
    paddingRight: '1.5rem !important',
    boxShadow: 'none',
  },
  dialogTitle: {
    width: 380,
    textAlign: 'center',
    fontSize: 20,
  },
  dialogContent: {
    width: 380,
    padding: '0 30px 30px',
  },
  alert: {
    marginBottom: 30,
  },
}))

const SignupButton = ({ dispatch, user }) => {
  const { error } = user

  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const classes = useStyles()
  const { fabButton, dialog, dialogTitle, dialogContent, alert } = classes

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (values, { setSubmitting }) => {
    // NEXT: add useState for done style for form button and delayed redirect to user page
    const onDone = () => setSubmitting(false)

    dispatch(signupUserAndUserInfo({ body: values, onDone }))
  }

  return (
    <Fragment>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        className={fabButton}
        onClick={handleClickOpen}
      >
        New Account
      </Fab>

      <Dialog
        className={dialog}
        fullScreen={fullScreen}
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" className={dialogTitle}>
          {'Create an Account'}
        </DialogTitle>

        {error && (
          <Alert className={alert} severity="error">
            {formatError({ error })}
          </Alert>
        )}

        <DialogContent className={dialogContent}>
          <SignupForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

const redux = [
  ({ user }) => ({
    user,
  }),
]

export default connect(...redux)(SignupButton)
