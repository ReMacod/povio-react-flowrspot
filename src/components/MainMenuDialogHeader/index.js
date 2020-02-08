import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import Brand from '../Brand'

import { dialogNames, actions as dialogActions } from '../../reducers/Dialogs'

const { MAIN_MENU } = dialogNames
const { setIsOpen, closeAll } = dialogActions

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.light.main,
  },
}))

const MainMenuDialogHeader = ({ dispatch }) => {
  const classes = useStyles()
  const { root } = classes

  const handleOpenMainMenu = () => {
    dispatch(closeAll())
    dispatch(setIsOpen({ key: MAIN_MENU, isOpen: true }))
  }

  const handleClosenMainMenu = () => {
    dispatch(closeAll())
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
