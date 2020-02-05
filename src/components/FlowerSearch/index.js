import React, { useState, useRef, Fragment } from 'react'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

import { debounce } from 'throttle-debounce'

import './style.sass'

const className = classNames({
  FlowerSearch: true,
})

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 450,
    marginTop: '2rem',
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  searchIconButton: {
    padding: 10,
  },
  clearIconButton: {
    padding: 10,
    color: theme.palette.gray.main,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

export default function FlowerSearch({ onSearch }) {
  const classes = useStyles()
  const { root, input, searchIconButton, clearIconButton, divider } = classes

  const [query, setQuery] = useState('')

  const handleSubmit = e => {
    e && e.preventDefault()
    onSearch({ query })
  }

  const submitDebounced = useRef(debounce(300, q => onSearch({ query: q }))).current

  const handleChange = e => {
    const q = e.target.value
    setQuery(q)
    submitDebounced(q)
  }

  const handleClear = () => {
    const q = ''
    setQuery(q)
    onSearch({ query: q })
  }

  return (
    <div className={className}>
      <Paper component="form" className={root} onSubmit={handleSubmit}>
        <InputBase
          className={input}
          placeholder="Looking for something specific?"
          inputProps={{ 'aria-label': 'search flowers' }}
          value={query}
          onChange={handleChange}
        />

        {query && (
          <Fragment>
            <IconButton className={clearIconButton} aria-label="clear" onClick={handleClear}>
              <CloseIcon />
            </IconButton>

            <Divider className={divider} orientation="vertical" />
          </Fragment>
        )}

        <IconButton
          color="primary"
          className={searchIconButton}
          aria-label="search"
          onClick={handleSubmit}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  )
}
