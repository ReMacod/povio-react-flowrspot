import React from 'react'
import classNames from 'classnames'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

import './style.sass'

import FlowerCard from '../FlowerCard'

const className = classNames({
  FlowerList: true,
})

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
}))

const FlowerList = ({ flowers }) => {
  const classes = useStyles()

  return (
    <div className={className}>
      <Grid container spacing={3}>
        {flowers.map(flower => (
          <Grid item key={flower.id} xs={6} sm={3} md={2} lg={2} xl={1}>
            <FlowerCard className={classes.paper} flower={flower} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default FlowerList
