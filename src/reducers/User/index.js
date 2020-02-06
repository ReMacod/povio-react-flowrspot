import { createSlice } from '@reduxjs/toolkit'

import { optionsGet, optionsPost } from '../../api/fetch'

import { usersRegister as userSignup, usersLogin as userSignin, usersMe } from '../../api/endpoints'

import { checkIsFetching, fetchActions, handleFetch } from '../fetch'

const initialFetchingState = {
  isFetching: false,
  error: null,
}

const initialUserState = {
  auth_token: null,
  user: null,
  // auth_token: 'string',
  // user: {
  //   id: 0,
  //   first_name: 'string',
  //   last_name: 'string',
  // },
}

const initialState = {
  ...initialFetchingState,
  ...initialUserState,
}

/* USER INFO */

const userInfoStart = (state, action) => ({ ...state, ...initialFetchingState, isFetching: true })
const userInfoSuccess = (state, action) => ({
  ...state,
  ...initialFetchingState,
  user: action.payload.user,
})
const userInfoFailed = (state, action) => ({
  state,
  ...initialFetchingState,
  error: action.payload.error,
})

/* SIGNUP */

const signupUserStart = (state, action) => ({ ...state, ...initialFetchingState, isFetching: true })
const signupUserSuccess = (state, action) => ({
  ...state,
  ...initialFetchingState,
  auth_token: action.payload.auth_token,
})
const signupUserFailed = (state, action) => ({
  ...state,
  ...initialFetchingState,
  ...initialUserState,
  error: action.payload.error,
})

/* SIGNIN */

const signinUserStart = (state, action) => ({ ...state, ...initialFetchingState, isFetching: true })
const signinUserSuccess = (state, action) => ({
  ...state,
  ...initialFetchingState,
  auth_token: action.payload.auth_token,
})
const signinUserFailed = (state, action) => ({
  ...state,
  ...initialFetchingState,
  ...initialUserState,
  error: action.payload.error,
})

/* SLICE */

const SLICE_NAME = 'user'

const userSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    userInfoStart,
    userInfoSuccess,
    userInfoFailed,
    signupUserStart,
    signupUserSuccess,
    signupUserFailed,
    signinUserStart,
    signinUserSuccess,
    signinUserFailed,
  },
})

export const { reducer, actions } = userSlice

/* THUNKS */

export const userInfo = () => (dispatch, getState) =>
  new Promise((fulfill, reject) => {
    if (checkIsFetching({ getState, SLICE_NAME, reject, error: 'Already getting user info' })) {
      return
    }

    const { onStart, onSuccess, onFailed } = fetchActions({ actions, THUNK_NAME: 'userInfo' })

    dispatch(onStart())

    const state = getState()
    const { auth_token } = state.user

    const options = {
      ...optionsGet,
      /* prettier-ignore */
      headers: { ...optionsGet.headers, 'Authorization': `Bearer ${auth_token}` }
    }

    const request = () => fetch(usersMe, options)

    handleFetch({ dispatch, request, fulfill, reject, onSuccess, onFailed })
  })

export const signupUser = ({ body } = {}) => (dispatch, getState) =>
  new Promise((fulfill, reject) => {
    if (checkIsFetching({ getState, SLICE_NAME, reject, error: 'Already signing up' })) {
      return
    }

    const { onStart, onSuccess, onFailed } = fetchActions({ actions, THUNK_NAME: 'signupUser' })

    dispatch(onStart())

    const options = { ...optionsPost, body: JSON.stringify(body) }
    const request = () => fetch(userSignup, options)

    handleFetch({ dispatch, request, fulfill, reject, onSuccess, onFailed })
  })

export const signinUser = ({ body } = {}) => (dispatch, getState) =>
  new Promise((fulfill, reject) => {
    if (checkIsFetching({ getState, SLICE_NAME, reject, error: 'Already signing in' })) {
      return
    }

    const { onStart, onSuccess, onFailed } = fetchActions({ actions, THUNK_NAME: 'signinUser' })

    dispatch(onStart())

    const options = { ...optionsPost, body: JSON.stringify(body) }
    const request = () => fetch(userSignin, options)

    handleFetch({ dispatch, request, fulfill, reject, onSuccess, onFailed })
  })
