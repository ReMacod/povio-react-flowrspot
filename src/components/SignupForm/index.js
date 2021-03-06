import React from 'react'
import classNames from 'classnames'
import { Formik, Form } from 'formik'
import Grid from '@material-ui/core/Grid'
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
  nameGrid: {
    width: 'calc(100% + 8px)',
    flexWrap: 'nowrap',
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

const SignupSchema = Yup.object().shape({
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  date_of_birth: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .required('Required'),
})

export default function SignupForm({ onSubmit, didSucceed }) {
  const classes = useStyles()
  const {
    root,
    form,
    nameGrid,
    submitButtonWrapper,
    submitButton,
    submitButtonSuccess,
    submitButtonProgress,
  } = classes

  const withSuccess = didSucceed ? submitButtonSuccess : ''
  const submitButtonClassName = `${submitButton} ${withSuccess}`

  return (
    <Formik
      className={root}
      initialValues={{
        first_name: '',
        last_name: '',
        date_of_birth: '',
        email: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
    >
      {({ submitForm, isSubmitting, errors, touched }) => (
        <Form className={form}>
          <Grid className={nameGrid} container spacing={1}>
            <Grid item>
              <TextField className={field} variant="filled" label="First Name" name="first_name" />
            </Grid>

            <Grid item>
              <TextField className={field} variant="filled" label="Last Name" name="last_name" />
            </Grid>
          </Grid>

          <TextField
            className={field}
            variant="filled"
            label="Date of Birth"
            name="date_of_birth"
          />
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
              {didSucceed ? 'Account created!' : 'Create Account'}
            </Button>

            {isSubmitting && <CircularProgress size={24} className={submitButtonProgress} />}
          </div>
        </Form>
      )}
    </Formik>
  )
}
