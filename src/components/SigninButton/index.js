import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import SigninForm from '../SigninForm'

import { signinUser, userInfo, userSightings } from '../../reducers/User'

import { formatAPIError } from '../../utils/Error'
import { withDelay } from '../../utils/Delay'

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

const SigninButton = ({ dispatch, user, onOpen: maybeOnOpen, DialogHeader = () => null }) => {
  const onOpen = maybeOnOpen ? maybeOnOpen : () => {}

  const { error } = user

  const [isOpen, setIsOpen] = useState(false)
  const [didLogin, setDidLogin] = useState(false)

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const classes = useStyles()
  const { button, dialog, dialogClose, dialogTitle, dialogContent, alert } = classes

  const dialogCloseClassName = `${dialogClose} ${fullScreen ? 'fullScreen' : ''}`
  const dialogTitleClassName = `${dialogTitle} ${fullScreen ? 'fullScreen' : ''}`
  const dialogContentClassName = `${dialogContent} ${fullScreen ? 'fullScreen' : ''}`

  const handleClickOpen = () => {
    onOpen(true)
    setIsOpen(true)
  }
  const handleClose = () => {
    onOpen(false)
    setIsOpen(false)
  }

  const handleUserInfoSuccess = () => {
    dispatch(userSightings())
      .then(() => {})
      .catch(error => {
        console.log('SigninButton handleLogin error', error)
      })
  }

  const handleSigninSuccess = () => {
    dispatch(userInfo())
      .then(() => {
        handleClose()
        handleUserInfoSuccess()
      })
      .catch(error => {
        console.log('SigninButton handleLogin error', error)
      })
  }

  const handleSubmit = (values, { setSubmitting }) => {
    setDidLogin(false)

    dispatch(signinUser({ body: values }))
      .then(() => {
        setSubmitting(false)
        setDidLogin(true)

        withDelay({ delay: 300, func: () => handleSigninSuccess({ setSubmitting }) })
      })
      .catch(error => setSubmitting(false))
  }

  return (
    <Fragment>
      <Button className={button} onClick={handleClickOpen}>
        Login
      </Button>

      <Dialog
        className={dialog}
        fullScreen={fullScreen}
        maxWidth="xs"
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogHeader />

        <IconButton
          className={dialogCloseClassName}
          edge="start"
          color="inherit"
          onClick={handleClose}
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
          <SigninForm onSubmit={handleSubmit} didSucceed={didLogin} />
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

export default connect(...redux)(SigninButton)
