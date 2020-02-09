import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import Brand from '../Brand'

import { dialogNames, openDialog, closeAllDialogs } from '../../reducers/Dialogs'

const { MAIN_MENU } = dialogNames

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.light.main,
  },
}))

const MainMenuDialogHeader = ({ dispatch }) => {
  const classes = useStyles()
  const { root } = classes

  const handleOpenMainMenu = () => {
    dispatch(closeAllDialogs())
    dispatch(openDialog({ dialogKey: MAIN_MENU }))
  }

  const handleClosenMainMenu = () => {
    dispatch(closeAllDialogs())
  }

  return (
    <MuiAppBar position="static" className={root}>
      <Toolbar>
        <Brand onClick={handleClosenMainMenu} />

        <IconButton edge="start" aria-label="menu" onClick={handleOpenMainMenu}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  )
}

export default connect()(MainMenuDialogHeader)
