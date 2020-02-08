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

import SigninForm from '../SigninForm'

import { formatAPIError } from '../../utils/Error'
import { withDelay } from '../../utils/Delay'

import { addMessage, removeMessage } from '../../reducers/Messages'
import { actions as userActions, signinUser, userInfo, userSightings } from '../../reducers/User'

const { resetFetching } = userActions

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

const SUCCESS_MESSAGE = 'SigninButtonSuccess'

const SuccessMessage = ({ dispatch, setIsProfileOpen }) => {
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
        setIsProfileOpen(true)
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

const successMessage = ({ dispatch, setIsProfileOpen }) => ({
  key: SUCCESS_MESSAGE,
  component: <SuccessMessage dispatch={dispatch} setIsProfileOpen={setIsProfileOpen} />,
})

const SigninButton = ({
  dispatch,
  user,
  onOpen: maybeOnOpen,
  setIsProfileOpen,
  DialogHeader = () => null,
}) => {
  const onOpen = maybeOnOpen ? maybeOnOpen : () => {}

  const { error } = user

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [didLogin, setDidLogin] = useState(false)

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const classes = useStyles()
  const { button, dialog, dialogClose, dialogTitle, dialogContent, alert } = classes

  const dialogCloseClassName = `${dialogClose} ${fullScreen ? 'fullScreen' : ''}`
  const dialogTitleClassName = `${dialogTitle} ${fullScreen ? 'fullScreen' : ''}`
  const dialogContentClassName = `${dialogContent} ${fullScreen ? 'fullScreen' : ''}`

  const handleClickOpenDialog = () => {
    onOpen(true)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    dispatch(resetFetching())
    onOpen(false)
    setIsDialogOpen(false)
  }

  const handleUserInfoSuccess = () => {
    dispatch(userSightings())
      .then(() => {})
      .catch(error => {
        console.log('SigninButton handleLogin error', error)
      })
  }

  const handleSigninSuccess = () => {
    dispatch(addMessage(successMessage({ dispatch, setIsProfileOpen })))

    dispatch(userInfo())
      .then(() => {
        // Cannot close because the component is conditional on !!user.user in AppBar
        // handleCloseDialog()
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

        // withDelay({ delay: 300, func: () => handleSigninSuccess({ setSubmitting }) })
        handleSigninSuccess({ setSubmitting })
      })
      .catch(error => setSubmitting(false))
  }

  return (
    <Fragment>
      <Button className={button} onClick={handleClickOpenDialog}>
        Login
      </Button>

      <Dialog
        className={dialog}
        fullScreen={fullScreen}
        maxWidth="xs"
        open={isDialogOpen}
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
