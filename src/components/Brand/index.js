import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'

import IconLogo from '../IconLogo'
import ButtonLink from '../ButtonLink'

const useStyles = makeStyles(theme => ({
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

export default function Brand({ onClick = () => {} }) {
  const brandLinkClasses = useStyles()

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
