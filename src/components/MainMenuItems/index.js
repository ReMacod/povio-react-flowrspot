import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import ButtonLink from '../ButtonLink'
import MainMenuDialogHeader from '../MainMenuDialogHeader'

import SignIn from '../SignIn'
import SignUp from '../SignUp'
import Profile from '../Profile'

import { dialogNames, actions as dialogActions } from '../../reducers/Dialogs'

const { MAIN_MENU } = dialogNames
const { setIsOpen } = dialogActions

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

const MainMenuItems = ({ dispatch, user }) => {
  const { user: userProfile } = user

  const buttonLinkClasses = buttonLinkStyles()

  const theme = useTheme()
  const isFullscreen = useMediaQuery(theme.breakpoints.down('xs'))

  const DialogHeader = isFullscreen ? MainMenuDialogHeader : Fragment

  const handleCloseMainMenu = () => {
    dispatch(setIsOpen({ key: MAIN_MENU, isOpen: false }))
  }

  return (
    <Fragment>
      <ButtonLink
        classes={buttonLinkClasses}
        label="Flowers"
        linkTo="/flowers"
        onClick={handleCloseMainMenu}
      />
      <ButtonLink
        classes={buttonLinkClasses}
        label="Latest Sightings"
        linkTo="/sightings"
        onClick={handleCloseMainMenu}
      />
      <ButtonLink
        classes={buttonLinkClasses}
        label="Favorites"
        linkTo="/favorites"
        onClick={handleCloseMainMenu}
      />

      {userProfile ? (
        <Profile DialogHeader={DialogHeader} />
      ) : (
        <Fragment>
          <SignIn DialogHeader={DialogHeader} />
          <br />
          <SignUp DialogHeader={DialogHeader} />
        </Fragment>
      )}
    </Fragment>
  )
}

const redux = [
  ({ user }) => ({
    user,
  }),
]

export default connect(...redux)(MainMenuItems)
