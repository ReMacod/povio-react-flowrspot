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

import { useHistory } from 'react-router-dom'

import SignupForm from '../SignupForm'

import { signupUser, userInfo } from '../../reducers/User'

import { formatAPIError } from '../../utils/Error'
import { withDelay } from '../../utils/Delay'

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

const SignupButton = ({ dispatch, user }) => {
  const { error } = user

  const [isOpen, setIsOpen] = useState(false)
  const [didRegister, setDidRegister] = useState(false)

  const history = useHistory()

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const classes = useStyles()
  const { fabButton, dialog, dialogClose, dialogTitle, dialogContent, alert } = classes

  const dialogCloseClassName = `${dialogClose} ${fullScreen ? 'fullScreen' : ''}`
  const dialogTitleClassName = `${dialogTitle} ${fullScreen ? 'fullScreen' : ''}`
  const dialogContentClassName = `${dialogContent} ${fullScreen ? 'fullScreen' : ''}`

  const handleClickOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleRegister = () => {
    dispatch(userInfo())
      .then(() => {
        // Cannot close because the component is conditional on !!user.user in AppBar
        // setIsOpen(false)
        history.push('/user')
      })
      .catch(error => {
        console.log('SignupButton handleRegister error', error)
      })
  }

  const handleSubmit = (values, { setSubmitting }) => {
    setDidRegister(false)

    dispatch(signupUser({ body: values }))
      .then(() => {
        setSubmitting(false)
        setDidRegister(true)

        withDelay({ func: () => handleRegister({ setSubmitting }) })
      })
      .catch(error => setSubmitting(false))
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
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
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
          {'Create an Account'}
        </DialogTitle>

        {error && (
          <Alert className={alert} severity="error">
            {formatAPIError({ error })}
          </Alert>
        )}

        <DialogContent className={dialogContentClassName}>
          <SignupForm onSubmit={handleSubmit} didSucceed={didRegister} />
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
