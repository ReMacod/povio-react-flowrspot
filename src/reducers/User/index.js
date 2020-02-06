import { createSlice } from '@reduxjs/toolkit'

import { optionsGet, optionsPost } from '../../api/fetch'
import { usersRegister as userSignup, usersMe } from '../../api/endpoints'

import { checkIsFetching, handleFetch } from '../fetch'

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

/* SLICE */

const SLICE_NAME = 'user'

const userSlice = createSlice({
  name: SLICE_NAME,
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

/* THUNKS */

export const userInfo = () => (dispatch, getState) =>
  new Promise((fulfill, reject) => {
    if (checkIsFetching({ getState, SLICE_NAME, reject, error: 'Already getting user info' })) {
      return
    }

    /* prettier-ignore */
    const {
      userInfoStart: start,
      userInfoSuccess: onSuccess,
      userInfoFailed: onFailed
    } = actions

    dispatch(start())

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

    /* prettier-ignore */
    const {
      signupUserStart: start,
      signupUserSuccess: onSuccess,
      signupUserFailed: onFailed,
    } = actions

    dispatch(start())

    const options = { ...optionsPost, body: JSON.stringify(body) }
    const request = () => fetch(userSignup, options)

    handleFetch({ dispatch, request, fulfill, reject, onSuccess, onFailed })
  })
