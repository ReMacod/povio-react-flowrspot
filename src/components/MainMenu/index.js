import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import MainMenuDialog from '../MainMenuDialog'
import MainMenuItems from '../MainMenuItems'

import { dialogNames, openDialog } from '../../reducers/Dialogs'

const { MAIN_MENU } = dialogNames

const MainMenu = ({ dispatch }) => {
  const theme = useTheme()
  const isFullscreen = useMediaQuery(theme.breakpoints.down('xs'))

  const handleOpenMainMenu = () => {
    dispatch(openDialog({ dialogKey: MAIN_MENU }))
  }

  return isFullscreen ? (
    <Fragment>
      <MainMenuDialog>
        <MainMenuItems />
      </MainMenuDialog>

      <IconButton edge="start" aria-label="menu" onClick={handleOpenMainMenu}>
        <MenuIcon />
      </IconButton>
    </Fragment>
  ) : (
    <MainMenuItems />
  )
}

export default connect()(MainMenu)
