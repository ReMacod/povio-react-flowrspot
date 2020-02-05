import { createSlice } from '@reduxjs/toolkit'

import { optionsGet, optionsPost } from '../../api/fetch'
import { usersRegister as userSignup, usersMe } from '../../api/endpoints'

import {
  withIsFetchingTrue,
  withIsFetchingFalse,
  handleFetchStart,
  handleFetchEndDelayed,
} from '../fetch'

const initialState = {
  isFetching: false,
  error: null,
  // auth_token: 'string',
  // user: {
  //   id: 0,
  //   first_name: 'string',
  //   last_name: 'string',
  // },
}

/* SIGNUP */

const signupUserStart = (state, action) => withIsFetchingTrue({ state: { ...state, error: null } })

const signupUserSuccess = (state, action) => {
  const { payload: auth_token } = action

  console.log('signupUserSuccess', auth_token)

  return withIsFetchingFalse({ state: auth_token })
}

const signupUserFailed = (state, action) => {
  const {
    payload: { auth_token, error },
  } = action

  return withIsFetchingFalse({ state: { ...state, auth_token, error } })
}

/* USER INFO */

const userInfoStart = (state, action) => withIsFetchingTrue({ state })

const userInfoSuccess = (state, action) => {
  const { payload: user } = action

  return withIsFetchingFalse({ state: { ...state, ...user } })
}

const userInfoFailed = (state, action) => withIsFetchingFalse({ state })

/* SLICE */

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signupUserStart,
    signupUserSuccess,
    signupUserFailed,
    userInfoStart,
    userInfoSuccess,
    userInfoFailed,
  },
})

export const { reducer, actions } = userSlice

/* ACTIONS */

export const userInfo = () => async (dispatch, getState) => {
  const state = getState()

  const { isFetching, auth_token } = state.user

  if (isFetching) {
    return
  }

  const { userInfoStart: start, userInfoSuccess: success, userInfoFailed: failed } = actions

  handleFetchStart({ dispatch, start, loadingConfig: { isDisabled: true } })

  const options = {
    ...optionsGet,
    /* prettier-ignore */
    headers: { ...optionsGet.headers, 'Authorization': `Bearer ${auth_token}` }
  }
  const request = () => fetch(usersMe, options)

  handleFetchEndDelayed({ dispatch, request, success, failed })
}

export const signupUser = ({ body, onSuccess, onDone } = {}) => async (dispatch, getState) => {
  const state = getState()

  if (state.user.isFetching) {
    return
  }

  const { signupUserStart: start, signupUserSuccess, signupUserFailed: failed } = actions

  handleFetchStart({ dispatch, start, loadingConfig: { isDisabled: true } })

  const options = { ...optionsPost, body: JSON.stringify(body) }
  const request = () => fetch(userSignup, options)
  const success = [signupUserSuccess, onSuccess]

  const delay = 500

  setTimeout(() => {
    setTimeout(() => {
      onDone()
    }, delay)

    handleFetchEndDelayed({ delay, dispatch, request, success, failed })
  }, 2000)
}

export const signupUserAndUserInfo = ({ body, onDone } = {}) => async (dispatch, getState) => {
  dispatch(signupUser({ body, onSuccess: userInfo, onDone }))
}
