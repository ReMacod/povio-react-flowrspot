import React from 'react'
import classNames from 'classnames'
import { Formik, Form } from 'formik'
import Grid from '@material-ui/core/Grid'
import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { TextField } from 'formik-material-ui'
import { makeStyles } from '@material-ui/core/styles'

import './style.sass'

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
    margin: theme.spacing(1),
    position: 'relative',
  },
  submitButton: {
    marginTop: 10,
    height: 50,
    textTransform: 'none',
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

const SignupForm = ({ onSubmit }) => {
  const classes = useStyles()
  const { root, form, nameGrid, submitButtonWrapper, submitButton, submitButtonProgress } = classes

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
      validate={values => {
        const errors = {}
        if (!values.email) {
          errors.email = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(values.email)) {
          errors.email = 'Invalid email address'
        }
        return errors
      }}
      onSubmit={onSubmit}
    >
      {({ submitForm, isSubmitting }) => (
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
              className={submitButton}
              variant="contained"
              size="large"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Create Account
            </Button>
            {isSubmitting && <CircularProgress size={24} className={submitButtonProgress} />}
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default SignupForm
