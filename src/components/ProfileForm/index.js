import React from 'react'
import classNames from 'classnames'
import { Formik, Form } from 'formik'
import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { TextField } from 'formik-material-ui'
import { makeStyles } from '@material-ui/core/styles'
import * as yup from 'yup'

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
    display: 'flex',
    justifyContent: 'center',
    margin: '40px 0',
  },
  submitButton: {
    marginTop: 10,
    marginRight: 10,
    height: 50,
    width: 150,
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

const SignupSchema = yup.object().shape({
  first_name: yup.string().required('Required'),
  last_name: yup.string().required('Required'),
  date_of_birth: yup.string().required('Required'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Required'),
})

const mockDateOfBirth = 'May 20, 1980'
const mockEmail = 'michael.berry@gmail.com'

export default function ProfileForm({
  user = {},
  onSubmitUpdate,
  onSubmitLogout,
  didUpdate,
  didLogout,
}) {
  const classes = useStyles()
  const {
    root,
    form,
    submitButtonWrapper,
    submitButton,
    submitButtonSuccess,
    submitButtonProgress,
  } = classes

  const withUpdateSuccess = didUpdate ? submitButtonSuccess : ''
  const updateButtonClassName = `${submitButton} ${withUpdateSuccess}`

  const {
    first_name = '',
    last_name = '',
    date_of_birth = mockDateOfBirth,
    email = mockEmail,
  } = user

  return (
    <Formik
      className={root}
      initialValues={{
        first_name,
        last_name,
        date_of_birth,
        email,
      }}
      validationSchema={SignupSchema}
      onSubmit={onSubmitUpdate}
    >
      {({ submitForm, isSubmitting, errors, touched }) => (
        <Form className={form}>
          <TextField className={field} label="First Name" name="first_name" />
          <TextField className={field} label="Last Name" name="last_name" />
          <TextField className={field} label="Date of Birth" name="date_of_birth" />
          <TextField className={field} name="email" type="email" label="Email Address" />

          <div className={submitButtonWrapper}>
            <Button
              className={updateButtonClassName}
              variant="contained"
              size="large"
              color="primary"
              disabled={isSubmitting || isFormError({ errors, touched })}
              onClick={submitForm}
            >
              {didUpdate ? 'Profile Updated!' : 'Update Profile'}
            </Button>

            <Button
              className={submitButton}
              size="large"
              color="primary"
              disabled={isSubmitting || isFormError({ errors, touched })}
              onClick={onSubmitLogout}
            >
              {didLogout ? 'Logged out!' : 'Logout'}
            </Button>

            {isSubmitting && <CircularProgress size={24} className={submitButtonProgress} />}
          </div>
        </Form>
      )}
    </Formik>
  )
}
