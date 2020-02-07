import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Alert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import { useHistory } from 'react-router-dom'

import ProfileForm from '../ProfileForm'

import { logoutUser } from '../../reducers/User'

import { formatAPIError } from '../../utils/Error'
import { withDelay } from '../../utils/Delay'

import Avatar from '../../assets/images/avatar.png'

const DIALOG_WIDTH = 600
const DIALOG_PADDING = 110

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: 'none',
    paddingLeft: '1.5rem !important',
    paddingRight: '1.5rem !important',
    boxShadow: 'none',

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  dialog: {
    '.MuiDialog-container': {
      '.MuiPaper-root': {
        alignItems: 'center',
      },
    },
  },
  dialogClose: {
    width: 50,
    position: 'absolute',
    top: 0,
    right: 0,
    color: theme.palette.gray.main,
  },
  dialogTitleWrapper: {
    width: DIALOG_WIDTH,
    marginTop: 60,
    padding: `0 ${DIALOG_PADDING}px 30px`,

    '&.fullScreen': {
      width: '100%',
    },
  },
  dialogWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: 300,
    margin: 0,
  },
  dialogSubtitle: {
    fontSize: 13,
    color: theme.palette.gray.main,
    margin: 0,
  },
  dialogContent: {
    width: DIALOG_WIDTH,
    padding: `0 ${DIALOG_PADDING}px 30px`,

    '&.fullScreen': {
      width: '100%',
    },
  },
  alert: {
    marginBottom: 30,
  },
}))

const ProfileButton = ({ dispatch, user }) => {
  const { error, user: userProfile } = user
  const { first_name, last_name } = userProfile

  const fullName = `${first_name} ${last_name}`

  const [isOpen, setIsOpen] = useState(false)
  const [didLogout, setDidLogout] = useState(false)

  const history = useHistory()

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const classes = useStyles()
  const {
    button,
    dialog,
    dialogClose,
    dialogTitleWrapper,
    dialogWrapper,
    dialogTitle,
    dialogSubtitle,
    dialogContent,
    alert,
  } = classes

  const dialogTitleClassName = `${dialogTitleWrapper} ${fullScreen ? 'fullScreen' : ''}`
  const dialogContentClassName = `${dialogContent} ${fullScreen ? 'fullScreen' : ''}`

  const handleClickOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  // Optimistic logout
  const handleSubmit = (values, { setSubmitting }) => {
    setDidLogout(false)

    withDelay({
      delay: 300,
      func: () => {
        setSubmitting(false)
        setDidLogout(true)
      },
    })

    withDelay({
      delay: 600,
      func: () => {
        setIsOpen(false)
        history.push('/')
      },
    })

    withDelay({
      delay: 700,
      func: () =>
        dispatch(logoutUser())
          .then(() => {})
          .catch(error => setSubmitting(false)),
    })
  }

  return (
    <Fragment>
      <Button className={button} onClick={handleClickOpen}>
        {fullName}
      </Button>

      <Dialog
        className={dialog}
        fullScreen={fullScreen}
        maxWidth="sm"
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <IconButton
          className={dialogClose}
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle id="responsive-dialog-title" className={dialogTitleClassName}>
          <Grid container spacing={3}>
            <Grid item>
              <img src={Avatar} alt="Avatar" />
            </Grid>

            <Grid item className={dialogWrapper}>
              <h2 className={dialogTitle}>{fullName}</h2>
              <p className={dialogSubtitle}>47 sightings</p>
            </Grid>
          </Grid>
        </DialogTitle>

        {error && (
          <Alert className={alert} severity="error">
            {formatAPIError({ error })}
          </Alert>
        )}

        <DialogContent className={dialogContentClassName}>
          <ProfileForm user={userProfile} onSubmit={handleSubmit} didSucceed={didLogout} />
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

export default connect(...redux)(ProfileButton)
