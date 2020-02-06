import React from 'react'
import classNames from 'classnames'
import { Formik, Form } from 'formik'
import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { TextField } from 'formik-material-ui'
import { makeStyles } from '@material-ui/core/styles'
import * as Yup from 'yup'

import './style.sass'

import { isFormError } from '../../utils/Error'

const field = classNames({
  TextField: true,
})

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  form: {
    '& *': {
      width: '100%',
    },
  },
  submitButtonWrapper: {
    position: 'relative',
  },
  submitButton: {
    marginTop: 10,
    height: 50,
    textTransform: 'none',
  },
  submitButtonSuccess: {
    background: theme.palette.success.main,
  },
  submitButtonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -6,
    marginLeft: -12,
  },
}))

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .required('Required'),
})

export default function SigninForm({ onSubmit, didSuceed }) {
  const classes = useStyles()
  const {
    root,
    form,
    submitButtonWrapper,
    submitButton,
    submitButtonSuccess,
    submitButtonProgress,
  } = classes

  const withSuccess = didSuceed ? submitButtonSuccess : ''
  const submitButtonClassName = `${submitButton} ${withSuccess}`

  return (
    <Formik
      className={root}
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={SigninSchema}
      onSubmit={onSubmit}
    >
      {({ submitForm, isSubmitting, errors, touched }) => (
        <Form className={form}>
          <TextField
            className={field}
            variant="filled"
            name="email"
            type="email"
            label="Email Address"
          />

          <TextField
            className={field}
            variant="filled"
            type="password"
            label="Password"
            name="password"
          />

          <div className={submitButtonWrapper}>
            <Button
              className={submitButtonClassName}
              variant="contained"
              size="large"
              color="primary"
              disabled={isSubmitting || isFormError({ errors, touched })}
              onClick={submitForm}
            >
              {didSuceed ? 'Logged in successfully!' : 'Login to your Account'}
            </Button>

            {isSubmitting && <CircularProgress size={24} className={submitButtonProgress} />}
          </div>
        </Form>
      )}
    </Formik>
  )
}
