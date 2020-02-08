import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import IconLogo from '../IconLogo'
import ButtonLink from '../ButtonLink'

import SigninButton from '../SigninButton'
import SignupButton from '../SignupButton'
import ProfileButton from '../ProfileButton'

import { withDelay } from '../../utils/Delay'

const appBarStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.light.main,
    boxShadow: 'none',
  },
  dialogHeader: {
    backgroundColor: theme.palette.light.main,
  },
  fablink: {
    color: theme.palette.light.main,
    textDecoration: 'none',
  },
  fabButton: {
    textTransform: 'none',
    paddingLeft: '1.5rem !important',
    paddingRight: '1.5rem !important',
    boxShadow: 'none',
  },
}))

const brandLinkStyles = makeStyles(theme => ({
  link: {
    flexGrow: 1,
    textDecoration: 'none',
  },
  icon: {
    marginRight: -theme.spacing(1),
    fontSize: '1rem',

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  button: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    textTransform: 'none',

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}))

const buttonLinkStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
  },
  button: {
    color: theme.palette.gray.main,
    textTransform: 'none',
    paddingLeft: 30,
    paddingRight: 30,

    '&:hover': {
      backgroundColor: 'transparent',
    },

    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0,
      marginBottom: 10,
      justifyContent: 'flex-start',
    },
  },
}))

const dialogStyles = makeStyles(theme => ({
  dialogClose: {
    width: 50,
    position: 'absolute',
    top: 5,
    right: 15,
    color: theme.palette.gray.main,
  },
  dialogTitle: {
    padding: '5px 17px 20px',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0 20',

    '& > button.MuiButton-root': {
      paddingLeft: '0 !important',

      '& > span.MuiButton-label': {
        justifyContent: 'flex-start',
      },
    },
  },
}))

const Brand = ({ onClick = () => {} }) => {
  const brandLinkClasses = brandLinkStyles()

  return (
    <ButtonLink
      classes={brandLinkClasses}
      label="FlowrSpot"
      icon={props => (
        <IconButton edge="start" color="inherit" {...props}>
          <IconLogo />
        </IconButton>
      )}
      linkTo="/"
      onClick={onClick}
    />
  )
}

const DialogHeader = ({ user, onClick, onClickDialogHeader }) => {
  const classes = appBarStyles()
  const { dialogHeader } = classes

  return (
    <MuiAppBar position="static" className={dialogHeader}>
      <Toolbar>
        <Brand onClick={() => onClickDialogHeader({ justClose: true })} />

        <IconButton edge="start" aria-label="menu" onClick={onClickDialogHeader}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  )
}

const MainMenuItems = ({ user, onClick, onClickDialogHeader }) => {
  const { user: userProfile } = user

  const buttonLinkClasses = buttonLinkStyles()

  const handleOpen = isOpen => {
    if (!isOpen) {
      onClick()
    }
  }

  const theme = useTheme()
  const isFullscreen = useMediaQuery(theme.breakpoints.down('xs'))

  const Header = () => (isFullscreen ? DialogHeader({ user, onClick, onClickDialogHeader }) : null)
  const onOpen = isFullscreen ? handleOpen : null

  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <Fragment>
      <ButtonLink classes={buttonLinkClasses} label="Flowers" linkTo="/flowers" onClick={onClick} />
      <ButtonLink
        classes={buttonLinkClasses}
        label="Latest Sightings"
        linkTo="/sightings"
        onClick={onClick}
      />
      <ButtonLink
        classes={buttonLinkClasses}
        label="Favorites"
        linkTo="/favorites"
        onClick={onClick}
      />

      {userProfile ? (
        <ProfileButton
          onOpen={onOpen}
          DialogHeader={Header}
          isOpen={isProfileOpen}
          setIsOpen={setIsProfileOpen}
        />
      ) : (
        <Fragment>
          <SigninButton onOpen={onOpen} DialogHeader={Header} setIsProfileOpen={setIsProfileOpen} />
          <br />
          <SignupButton onOpen={onOpen} DialogHeader={Header} />
        </Fragment>
      )}
    </Fragment>
  )
}

const MainMenuDialog = ({ isOpen, onClose, children }) => {
  const dialogClasses = dialogStyles()
  const { dialog, dialogClose, dialogTitle, dialogContent } = dialogClasses

  return (
    <Dialog
      className={dialog}
      fullScreen={true}
      maxWidth="sm"
      open={isOpen}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <IconButton
        className={dialogClose}
        edge="start"
        color="inherit"
        onClick={onClose}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle id="responsive-dialog-title" className={dialogTitle}>
        <Brand onClick={onClose} />
      </DialogTitle>

      <DialogContent className={dialogContent}>{children}</DialogContent>
    </Dialog>
  )
}

const MainMenu = ({ user, isFullscreen, isDialogOpen, onCloseDialog, onClickDialogHeader }) =>
  isFullscreen ? (
    <MainMenuDialog isOpen={isDialogOpen} onClose={onCloseDialog}>
      <MainMenuItems
        user={user}
        onClick={onCloseDialog}
        onClickDialogHeader={onClickDialogHeader}
      />
    </MainMenuDialog>
  ) : (
    <MainMenuItems user={user} />
  )

const AppBar = ({ user }) => {
  const classes = appBarStyles()
  const { root, appBar } = classes

  const theme = useTheme()
  const isFullscreen = useMediaQuery(theme.breakpoints.down('xs'))

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleClickOpen = () => setIsDialogOpen(true)
  const handleClickClose = () => setIsDialogOpen(false)

  // Closes all dialogs and optionally opens the menu dialog again
  const handleClickDialogHeader = ({ justClose }) => {
    handleClickClose()

    if (justClose) {
      return
    }

    withDelay({ delay: 300, func: handleClickOpen })
  }

  return (
    <div className={root}>
      <MuiAppBar position="static" className={appBar}>
        <Toolbar>
          <Brand />

          <MainMenu
            user={user}
            isFullscreen={isFullscreen}
            isDialogOpen={isDialogOpen}
            onCloseDialog={handleClickClose}
            onClickDialogHeader={handleClickDialogHeader}
          />

          {isFullscreen && (
            <IconButton edge="start" aria-label="menu" onClick={handleClickOpen}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </MuiAppBar>
    </div>
  )
}

const redux = [
  ({ user }) => ({
    user,
  }),
]

export default connect(...redux)(AppBar)
