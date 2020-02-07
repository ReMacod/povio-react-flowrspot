import { createSlice } from '@reduxjs/toolkit'

import { optionsGet, optionsPost, optionsPut } from '../../api/fetch'

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

/* UPDATE */

const updateUserStart = (state, action) => ({ ...state, ...initialFetchingState, isFetching: true })
const updateUserSuccess = (state, action) => ({
  ...state,
  ...initialFetchingState,
  user: action.payload.user,
})
const updateUserFailed = (state, action) => ({
  ...state,
  ...initialFetchingState,
  error: action.payload.error,
})

/* LOGOUT */

const logoutUserStart = (state, action) => ({ ...state, ...initialFetchingState, isFetching: true })
const logoutUserSuccess = (state, action) => ({
  ...state,
  ...initialFetchingState,
  ...initialUserState,
})
const logoutUserFailed = (state, action) => ({
  ...state,
  ...initialFetchingState,
  error: action.payload.error,
})

/* SLICE */

const SLICE_NAME = 'user'

const userSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    // userInfo
    userInfoStart,
    userInfoSuccess,
    userInfoFailed,
    // signupUser
    signupUserStart,
    signupUserSuccess,
    signupUserFailed,
    // signinUser
    signinUserStart,
    signinUserSuccess,
    signinUserFailed,
    // updateUser
    updateUserStart,
    updateUserSuccess,
    updateUserFailed,
    // logoutUser
    logoutUserStart,
    logoutUserSuccess,
    logoutUserFailed,
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

// FIX: Fetch here doesn't work
export const updateUser = ({ body } = {}) => (dispatch, getState) =>
  new Promise((fulfill, reject) => {
    if (checkIsFetching({ getState, SLICE_NAME, reject, error: 'Already updating profile' })) {
      return
    }

    const { onStart, onSuccess, onFailed } = fetchActions({ actions, THUNK_NAME: 'updateUser' })

    dispatch(onStart())

    const options = { ...optionsPut, body: JSON.stringify(body) }
    const request = () => fetch(usersMe, options)

    handleFetch({ dispatch, request, fulfill, reject, onSuccess, onFailed })
  })

// FIX: There is no logout endpoint in API to revoke the auth_token
export const logoutUser = ({ body } = {}) => (dispatch, getState) =>
  new Promise((fulfill, reject) => {
    if (checkIsFetching({ getState, SLICE_NAME, reject, error: 'Already logging out user' })) {
      return
    }

    const { onStart, onSuccess, onFailed } = fetchActions({ actions, THUNK_NAME: 'logoutUser' })

    dispatch(onStart())

    // const options = { ...optionsPost, body: JSON.stringify(body) }
    // const request = () => fetch(usersLogout, options)
    const mockResponse = new Response(JSON.stringify({ auth_token: null }), { status: 200 })
    const request = () => mockResponse

    handleFetch({ dispatch, request, fulfill, reject, onSuccess, onFailed })
  })
