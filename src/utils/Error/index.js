import React from 'react'

export const formatError = ({ error }) =>
  (error.split('. ') || []).map(e => <span key={e}>{e}</span>)
