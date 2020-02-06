import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Alert from '@material-ui/lab/Alert'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import { useHistory } from 'react-router-dom'

import SigninForm from '../SigninForm'

import { signinUser, userInfo } from '../../reducers/User'

import { formatAPIError } from '../../utils/Error'
import { withDelay } from '../../utils/Delay'

const useStyles = makeStyles(theme => ({
  button: {
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

const SigninButton = ({ dispatch, user }) => {
  const { error } = user

  const [isOpen, setIsOpen] = useState(false)
  const [didLogin, setDidLogin] = useState(false)

  const history = useHistory()

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const classes = useStyles()
  const { button, dialog, dialogTitle, dialogContent, alert } = classes

  const handleClickOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleLogin = () => {
    dispatch(userInfo())
      .then(() => {
        setIsOpen(false)
        history.push('/user')
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

        withDelay({ func: () => handleLogin({ setSubmitting }) })
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
        <DialogTitle id="responsive-dialog-title" className={dialogTitle}>
          {'Welcome Back'}
        </DialogTitle>

        {error && (
          <Alert className={alert} severity="error">
            {formatAPIError({ error })}
          </Alert>
        )}

        <DialogContent className={dialogContent}>
          <SigninForm onSubmit={handleSubmit} didSuceed={didLogin} />
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
