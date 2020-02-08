import React, { useState, useEffect, useCallback, Fragment } from 'react'
import { connect } from 'react-redux'
import Fab from '@material-ui/core/Fab'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Alert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import SignupForm from '../SignupForm'

import { formatAPIError } from '../../utils/Error'
import { withDelay } from '../../utils/Delay'

import { addMessage, removeMessage } from '../../reducers/Messages'
import { actions as userActions, signupUser, userInfo } from '../../reducers/User'
import { dialogNames, actions as dialogActions } from '../../reducers/Dialogs'

const { MAIN_MENU, SIGN_UP, PROFILE } = dialogNames
const { setIsOpen } = dialogActions

const { resetFetching } = userActions

/* SUCCESS_MESSAGE */

// NEXT: Extract SuccessMessage. Fix OK PROFILE grid

const SUCCESS_MESSAGE = 'SignUpSuccess'

const SuccessMessage = ({ dispatch }) => {
  const [open, setOpen] = React.useState(false)

  const handleClose = useCallback(() => {
    setOpen(false)

    withDelay({ delay: 300, func: () => dispatch(removeMessage({ key: SUCCESS_MESSAGE })) })
  }, [dispatch])

  useEffect(() => {
    withDelay({ delay: 300, func: () => setOpen(true) })
  }, [])

  useEffect(() => {
    withDelay({ delay: 5000, func: () => handleClose() })
  }, [handleClose])

  const handleOpenProfile = () => {
    withDelay({
      delay: 300,
      func: () => {
        dispatch(setIsOpen({ key: MAIN_MENU, isOpen: true }))
        dispatch(setIsOpen({ key: PROFILE, isOpen: true }))
        handleClose()
      },
    })
  }

  return (
    <Collapse in={open}>
      <Alert
        action={
          <Grid container spacing={3}>
            <Grid item>
              <IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}>
                OK
              </IconButton>
            </Grid>

            <Grid item>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleOpenProfile}
              >
                PROFILE
              </IconButton>
            </Grid>
          </Grid>
        }
      >
        Congratulations! You have successfully signed up for FlowrSpot!
      </Alert>
    </Collapse>
  )
}

const SuccessMessageConnected = connect()(SuccessMessage)

const successMessage = () => ({
  key: SUCCESS_MESSAGE,
  component: <SuccessMessageConnected />,
})

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
    dispatch(setIsOpen({ key: MAIN_MENU, isOpen: true }))
    dispatch(setIsOpen({ key: SIGN_UP, isOpen: true }))
  }
  const handleCloseDialog = () => {
    dispatch(resetFetching())
    dispatch(setIsOpen({ key: MAIN_MENU, isOpen: false }))
    dispatch(setIsOpen({ key: SIGN_UP, isOpen: false }))
  }

  // Sign Up

  const handleSignUpSuccess = () => {
    dispatch(addMessage(successMessage()))

    dispatch(userInfo())
      .then(() => {
        handleCloseDialog()
      })
      .catch(error => {
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
