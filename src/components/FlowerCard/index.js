import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import StarIcon from '@material-ui/icons/Star'

import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  content: {
    justifyContent: 'center',
    padding: '0 10px',
  },
  title: {
    fontSize: 20,
    color: theme.palette.light.main,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: theme.palette.light.main,
    opacity: 0.7,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  actions: {
    justifyContent: 'center',
    marginBottom: '0.5rem',
  },
  sightingsButton: {
    paddingLeft: '1rem !important',
    paddingRight: '1rem !important',
    textTransform: 'none',
  },
  favoriteButton: {
    position: 'absolute',
    top: '0.7rem',
    right: '0.7rem',
    background: theme.palette.light.main,
    color: theme.palette.gray.main,
    '&:hover': {
      color: theme.palette.light.main,
    },
  },
  favoriteIcon: {
    fontSize: '1.2rem',
  },
}))

export default function FlowerCard({ flower, isLoggedIn }) {
  const classes = useStyles()
  const {
    root,
    content,
    title,
    subtitle,
    actions,
    sightingsButton,
    favoriteButton,
    favoriteIcon,
  } = classes

  const { name, latin_name, profile_picture, sightings } = flower

  const background = `url(https:${profile_picture}) center center / cover`

  return (
    <Card className={root} style={{ background }}>
      <CardContent className={content}>
        <Typography className={title}>{name}</Typography>

        <Typography className={subtitle} gutterBottom>
          {latin_name}
        </Typography>
      </CardContent>

      <CardActions className={actions}>
        <Fab
          variant="extended"
          size="small"
          color="secondary"
          aria-label="add"
          className={sightingsButton}
        >
          {sightings} sightings
        </Fab>

        {isLoggedIn && (
          <Fab
            variant="extended"
            size="small"
            color="primary"
            aria-label="add"
            className={favoriteButton}
          >
            <StarIcon className={favoriteIcon} />
          </Fab>
        )}
      </CardActions>
    </Card>
  )
}
