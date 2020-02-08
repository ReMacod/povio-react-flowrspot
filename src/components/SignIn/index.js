import React, { useState, useEffect, useCallback, Fragment } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Collapse from '@material-ui/core/Collapse'
import Grid from '@material-ui/core/Grid'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import SignInForm from '../SignInForm'

import { formatAPIError } from '../../utils/Error'
import { withDelay } from '../../utils/Delay'

import { addMessage, removeMessage } from '../../reducers/Messages'
import { actions as userActions, signinUser, userInfo, userSightings } from '../../reducers/User'
import { dialogNames, actions as dialogActions } from '../../reducers/Dialogs'

const { MAIN_MENU, SIGN_IN, PROFILE } = dialogNames
const { setIsOpen } = dialogActions

const { resetFetching } = userActions

/* SUCCESS_MESSAGE */

const SUCCESS_MESSAGE = 'SignInSuccess'

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
    withDelay({ delay: 10000, func: () => handleClose() })
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
        Congratulations! You have successfully logged into FlowrSpot!
      </Alert>
    </Collapse>
  )
}

const SuccessMessageConnected = connect()(SuccessMessage)

const successMessage = () => ({
  key: SUCCESS_MESSAGE,
  component: <SuccessMessageConnected />,
})

/* SIGN_IN */

const DIALOG_WIDTH = 380

const useStyles = makeStyles(theme => ({
  dialog: {
    '& MuiDialog-root': {
      top: 56,
    },
  },
  button: {
    color: theme.palette.primary.main,
    textTransform: 'none',
    paddingLeft: '1.5rem !important',
    paddingRight: '1.5rem !important',
    boxShadow: 'none',

    '&:hover': {
      backgroundColor: 'transparent',
    },
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
    fontWeight: 500,

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

const SignIn = ({ dispatch, dialogs, user, DialogHeader = () => null }) => {
  const { error } = user

  const { dialogs: dialogsList } = dialogs
  const { isOpen } = dialogsList[SIGN_IN]

  const [didSignIn, setDidSignIn] = useState(false)

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const classes = useStyles()
  const { button, dialog, dialogClose, dialogTitle, dialogContent, alert } = classes

  const dialogCloseClassName = `${dialogClose} ${fullScreen ? 'fullScreen' : ''}`
  const dialogTitleClassName = `${dialogTitle} ${fullScreen ? 'fullScreen' : ''}`
  const dialogContentClassName = `${dialogContent} ${fullScreen ? 'fullScreen' : ''}`

  // Dialog

  const handleOpenDialog = () => {
    dispatch(setIsOpen({ key: MAIN_MENU, isOpen: true }))
    dispatch(setIsOpen({ key: SIGN_IN, isOpen: true }))
  }

  const handleCloseDialog = () => {
    dispatch(resetFetching())
    dispatch(setIsOpen({ key: MAIN_MENU, isOpen: false }))
    dispatch(setIsOpen({ key: SIGN_IN, isOpen: false }))
  }

  // Sign In

  const handleUserInfoSuccess = () => {
    dispatch(userSightings())
      .then(() => {})
      .catch(error => {
        console.log('SigninButton handleLogin error', error)
      })
  }

  const handleSigninSuccess = () => {
    dispatch(addMessage(successMessage()))

    dispatch(userInfo())
      .then(() => {
        handleCloseDialog()
        handleUserInfoSuccess()
      })
      .catch(error => {
        console.log('SigninButton handleLogin error', error)
      })
  }

  const handleSubmit = (values, { setSubmitting }) => {
    setDidSignIn(false)

    dispatch(signinUser({ body: values }))
      .then(() => {
        setSubmitting(false)
        setDidSignIn(true)

        handleSigninSuccess({ setSubmitting })
      })
      .catch(error => setSubmitting(false))
  }

  // Render

  return (
    <Fragment>
      <Button className={button} onClick={handleOpenDialog}>
        Login
      </Button>

      <Dialog
        className={dialog}
        fullScreen={fullScreen}
        maxWidth="xs"
        open={isOpen}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogHeader />

        <IconButton
          className={dialogCloseClassName}
          edge="start"
          color="inherit"
          onClick={handleCloseDialog}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle id="responsive-dialog-title" className={dialogTitleClassName}>
          {'Welcome Back'}
        </DialogTitle>

        {error && (
          <Alert className={alert} severity="error">
            {formatAPIError({ error })}
          </Alert>
        )}

        <DialogContent className={dialogContentClassName}>
          <SignInForm onSubmit={handleSubmit} didSucceed={didSignIn} />
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

export default connect(...redux)(SignIn)
