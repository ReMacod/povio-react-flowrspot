import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import Brand from '../Brand'
import MainMenu from '../MainMenu'

const appBarStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.light.main,
    boxShadow: 'none',
  },
}))

export default function AppBar() {
  const classes = appBarStyles()
  const { root, appBar } = classes

  return (
    <div className={root}>
      <MuiAppBar position="static" className={appBar}>
        <Toolbar>
          <Brand />
          <MainMenu />
        </Toolbar>
      </MuiAppBar>
    </div>
  )
}
