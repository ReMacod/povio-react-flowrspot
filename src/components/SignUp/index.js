import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import Fab from '@material-ui/core/Fab'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import SignupForm from '../SignupForm'
import Message from '../Message'
import { openProfile } from '../Profile'

import { formatAPIError } from '../../utils/Error'
import { withDelay } from '../../utils/Delay'

import { addMessage, hideMessage } from '../../reducers/Messages'
import { actions as userActions, signupUser, userInfo } from '../../reducers/User'
import { dialogNames, openDialog, closeDialog } from '../../reducers/Dialogs'

const { MAIN_MENU, SIGN_UP } = dialogNames

const { resetFetching } = userActions

/* SIGN_UP SUCCESS MESSAGE */

const SUCCESS_MESSAGE_KEY = 'SignUpSuccess'

const successMessage = ({ dispatch }) => {
  const handleOpenProfile = () => {
    withDelay({
      delay: 300,
      func: () => {
        openProfile({ dispatch })
        dispatch(hideMessage({ messageKey: SUCCESS_MESSAGE_KEY }))
      },
    })
  }

  const content = <span>Congratulations! You have successfully signed up for FlowrSpot!</span>

  const actions = {
    profile: (
      <IconButton aria-label="close" color="inherit" size="small" onClick={handleOpenProfile}>
        PROFILE
      </IconButton>
    ),
  }

  return {
    messageKey: SUCCESS_MESSAGE_KEY,
    component: (
      <Message
        messageKey={SUCCESS_MESSAGE_KEY}
        content={content}
        actions={actions}
        alertProps={{ severity: 'success' }}
      />
    ),
  }
}

/* SIGN_UP */

const DIALOG_WIDTH = 380

const useStyles = makeStyles(theme => ({
  fabButton: {
    textTransform: 'none',
    paddingLeft: '1.5rem !important',
    paddingRight: '1.5rem !important',
    boxShadow: 'none',
  },
  dialogClose: {
    display: 'none',
    width: 50,
    position: 'absolute',
    top: 7,
    right: 25,
    color: theme.palette.gray.main,

    '&.fullScreen': {
      display: 'block',
    },
  },
  dialogTitle: {
    width: DIALOG_WIDTH,
    textAlign: 'center',
    fontSize: 20,

    '&.fullScreen': {
      width: '100%',
    },
  },
  dialogContent: {
    width: DIALOG_WIDTH,
    padding: '0 30px 30px',

    '&.fullScreen': {
      width: '100%',
    },
  },
  alert: {
    marginBottom: 30,
  },
}))

const SignUp = ({ dispatch, dialogs, user, DialogHeader = () => null }) => {
  const { error } = user

  const { dialogs: dialogsList } = dialogs
  const { isOpen } = dialogsList[SIGN_UP]

  const [didSignUp, setDidSignUp] = useState(false)

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const classes = useStyles()
  const { fabButton, dialog, dialogClose, dialogTitle, dialogContent, alert } = classes

  const dialogCloseClassName = `${dialogClose} ${fullScreen ? 'fullScreen' : ''}`
  const dialogTitleClassName = `${dialogTitle} ${fullScreen ? 'fullScreen' : ''}`
  const dialogContentClassName = `${dialogContent} ${fullScreen ? 'fullScreen' : ''}`

  // Dialog

  const handleOpenDialog = () => {
    dispatch(openDialog({ dialogKey: MAIN_MENU }))
    dispatch(openDialog({ dialogKey: SIGN_UP }))
    // dispatch(hideMessage({ messageKey: SUCCESS_MESSAGE_KEY }))
  }
  const handleCloseDialog = () => {
    dispatch(resetFetching())
    dispatch(closeDialog({ dialogKey: SIGN_UP }))
    dispatch(closeDialog({ dialogKey: MAIN_MENU }))
  }

  // Sign Up

  const handleSignUpSuccess = () => {
    dispatch(addMessage(successMessage({ dispatch })))

    dispatch(userInfo())
      .then(() => {
        handleCloseDialog()
      })
      .catch(error => {
        // Errors already handled in SignUpForm
        console.log('SignupButton handleRegister error', error)
      })
  }

  const handleSubmit = (values, { setSubmitting }) => {
    setDidSignUp(false)

    dispatch(signupUser({ body: values }))
      .then(() => {
        setSubmitting(false)
        setDidSignUp(true)

        handleSignUpSuccess({ setSubmitting })
      })
      .catch(error => setSubmitting(false))
  }

  // Render

  return (
    <Fragment>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        className={fabButton}
        onClick={handleOpenDialog}
      >
        New Account
      </Fab>

      <Dialog
        className={dialog}
        fullScreen={fullScreen}
        maxWidth="xs"
        open={isOpen}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <IconButton
          className={dialogCloseClassName}
          edge="start"
          color="inherit"
          onClick={handleCloseDialog}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        <DialogHeader />

        <DialogTitle id="responsive-dialog-title" className={dialogTitleClassName}>
          {'Create an Account'}
        </DialogTitle>

        {error && (
          <Alert className={alert} severity="error">
            {formatAPIError({ error })}
          </Alert>
        )}

        <DialogContent className={dialogContentClassName}>
          <SignupForm onSubmit={handleSubmit} didSucceed={didSignUp} />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

const redux = [
  ({ dialogs, user }) => ({
    dialogs,
    user,
  }),
]

export default connect(...redux)(SignUp)
