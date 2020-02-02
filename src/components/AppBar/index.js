import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Fab from '@material-ui/core/Fab'

import IconLogo from '../IconLogo'
import ButtonLink from '../ButtonLink'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.light.main,
    boxShadow: 'none',
  },
  mainMenu: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  mobileMenu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
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
  },
  button: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.light.main,
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
    paddingLeft: '30px',
    paddingRight: '30px',
  },
}))

export default function AppBar() {
  const classes = useStyles()
  const { root, appBar, mainMenu, mobileMenu, fablink, fabButton } = classes

  const brandLinkClasses = brandLinkStyles()
  const buttonLinkClasses = buttonLinkStyles()

  return (
    <div className={root}>
      <MuiAppBar position="static" className={appBar}>
        <Toolbar>
          <ButtonLink
            classes={brandLinkClasses}
            label="FlowrSpot"
            icon={props => (
              <IconButton edge="start" color="inherit" {...props}>
                <IconLogo />
              </IconButton>
            )}
            linkTo="/"
          />

          <div className={mainMenu}>
            <ButtonLink classes={buttonLinkClasses} label="Flowers" linkTo="/flowers" />
            <ButtonLink classes={buttonLinkClasses} label="Latest Sightings" linkTo="/sightings" />
            <ButtonLink classes={buttonLinkClasses} label="Favorites" linkTo="/favorites" />
            <ButtonLink classes={buttonLinkClasses} label="Login" linkTo="/" />

            <Link to="/signup" className={fablink}>
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="add"
                className={fabButton}
              >
                New Account
              </Fab>
            </Link>
          </div>

          <IconButton edge="start" className={mobileMenu} aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </MuiAppBar>
    </div>
  )
}
