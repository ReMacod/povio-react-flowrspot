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
import Message from '../Message'

import { updateUser, logoutUser } from '../../reducers/User'
import { addMessage } from '../../reducers/Messages'

import { formatAPIError } from '../../utils/Error'
import { withDelay } from '../../utils/Delay'

import Avatar from '../../assets/images/avatar.png'

import { dialogNames, openDialog, closeDialog } from '../../reducers/Dialogs'

const { MAIN_MENU, PROFILE } = dialogNames

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

    [theme.breakpoints.down('xs')]: {
      padding: `0 30px 30px`,
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

    [theme.breakpoints.down('xs')]: {
      padding: `0 30px 30px`,
    },
  },
  alert: {
    marginBottom: 30,
  },
}))

/* LOGOUT MESSAGES */

const SUCCESS_MESSAGE_KEY = 'ProfileLogoutSuccess'

const logoutSuccessMessage = ({ dispatch }) => {
  const content = <span>You have successfully logged out of FlowrSpot!</span>

  return {
    messageKey: SUCCESS_MESSAGE_KEY,
    component: (
      <Message
        messageKey={SUCCESS_MESSAGE_KEY}
        content={content}
        alertProps={{ severity: 'success' }}
      />
    ),
  }
}

const FAILED_MESSAGE_KEY = 'ProfileLogoutFailed'

const logoutFailedMessage = ({ dispatch, error }) => {
  const handleOpenProfile = () => {
    withDelay({
      delay: 300,
      func: () => {
        dispatch(openDialog({ dialogKey: MAIN_MENU }))
        dispatch(openDialog({ dialogKey: PROFILE }))
      },
    })
  }

  const content = <span>Failed to log out of FlowrSpot! Reason: {error}</span>

  const actions = {
    profile: (
      <IconButton aria-label="close" color="inherit" size="small" onClick={handleOpenProfile}>
        PROFILE
      </IconButton>
    ),
  }

  return {
    messageKey: FAILED_MESSAGE_KEY,
    component: (
      <Message
        messageKey={FAILED_MESSAGE_KEY}
        content={content}
        actions={actions}
        alertProps={{ severity: 'error' }}
      />
    ),
  }
}

/* PROFILE */

export const openProfile = ({ dispatch }) => {
  dispatch(openDialog({ dialogKey: MAIN_MENU }))
  dispatch(openDialog({ dialogKey: PROFILE }))
}

export const closeProfile = ({ dispatch }) => {
  dispatch(closeDialog({ dialogKey: PROFILE }))
  dispatch(closeDialog({ dialogKey: MAIN_MENU }))
}

const Profile = ({ dispatch, user, dialogs, DialogHeader = () => null }) => {
  const { error, user: userProfile, sightings } = user
  const { first_name, last_name } = userProfile
  const { sightings: sightingsList } = sightings

  const { dialogs: dialogsList } = dialogs
  const { isOpen } = dialogsList[PROFILE]

  const fullName = `${first_name} ${last_name}`

  const numOfSightings = sightingsList.length
  const isSightingsPlural = numOfSightings === 0 || numOfSightings > 1
  const sightingsString = `sighting${isSightingsPlural ? 's' : ''}`
  const numOfSightingsFormatted = `${numOfSightings} ${sightingsString}`

  const [didUpdate, setDidUpdate] = useState(false)
  const [didLogout, setDidLogout] = useState(false)

  const history = useHistory()

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const classes = useStyles()
  const {
    button,
    dialog: dialogClassName,
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

  const handleOpenProfile = () => openProfile({ dispatch })
  const handleCloseProfile = () => closeProfile({ dispatch })

  const handleSubmitUpdate = (values, { setSubmitting }) => {
    setDidUpdate(false)

    dispatch(updateUser({ body: values }))
      .then(() => {
        setSubmitting(false)
        setDidUpdate(true)

        withDelay({ func: () => setDidUpdate(false) })
      })
      .catch(error => setSubmitting(false))
  }

  // Optimistic logout because Profile dialog shows only when !!user.user is in store
  const handleSubmitLogout = () => {
    setDidLogout(false)

    withDelay({
      delay: 300,
      func: () => {
        setDidLogout(true)
      },
    })

    withDelay({
      delay: 600,
      func: () => {
        history.push('/')
      },
    })

    withDelay({
      delay: 700,
      func: () => {
        setDidLogout(false)
        handleCloseProfile()

        dispatch(logoutUser())
          .then(() => {
            dispatch(addMessage(logoutSuccessMessage({ dispatch })))
          })
          .catch(error => {
            dispatch(addMessage(logoutFailedMessage({ dispatch, error })))
          })
      },
    })
  }

  return (
    <Fragment>
      <Button className={button} onClick={handleOpenProfile}>
        {fullName}
      </Button>

      <Dialog
        className={dialogClassName}
        fullScreen={fullScreen}
        maxWidth="sm"
        open={isOpen}
        onClose={handleCloseProfile}
        aria-labelledby="responsive-dialog-title"
      >
        <IconButton
          className={dialogClose}
          edge="start"
          color="inherit"
          onClick={handleCloseProfile}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        <DialogHeader />

        <DialogTitle id="responsive-dialog-title" className={dialogTitleClassName}>
          <Grid container spacing={3}>
            <Grid item>
              <img src={Avatar} alt="Avatar" />
            </Grid>

            <Grid item className={dialogWrapper}>
              <h2 className={dialogTitle}>{fullName}</h2>
              <p className={dialogSubtitle}>{numOfSightingsFormatted}</p>
            </Grid>
          </Grid>
        </DialogTitle>

        {error && (
          <Alert className={alert} severity="error">
            {formatAPIError({ error })}
          </Alert>
        )}

        <DialogContent className={dialogContentClassName}>
          <ProfileForm
            user={userProfile}
            onSubmitUpdate={handleSubmitUpdate}
            onSubmitLogout={handleSubmitLogout}
            didUpdate={didUpdate}
            didLogout={didLogout}
          />
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

export default connect(...redux)(Profile)
