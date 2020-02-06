import React from 'react'

export const formatAPIError = ({ error }) =>
  (error.split('. ') || []).map(e => <span key={e}>{e}</span>)

export const isFormError = ({ errors, touched }) =>
  Object.keys(errors).reduce((isErrorAcc, errorKey) => touched[errorKey] || isErrorAcc, false)
