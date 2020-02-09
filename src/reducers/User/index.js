import { createSlice } from '@reduxjs/toolkit'

import { optionsGet, optionsPost, optionsPut } from '../../api/fetch'

import {
  usersRegister as userSignup,
  usersLogin as userSignin,
  usersMe,
  userSightings as userSightingsUrl,
} from '../../api/endpoints'

import { checkIsFetching, fetchActions, handleFetch } from '../fetch'

/* STATE */

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

const initialUserSightingsState = {
  sightings: [
    //   {
    //     id: 0,
    //     flower_id: 0,
    //     name: 'string',
    //     description: 'string',
    //     latitude: 0,
    //     longitude: 0,
    //   },
  ],
  // meta: {
  //   pagination: {
  //     current_page: 0,
  //     prev_page: 0,
  //     next_page: 0,
  //     total_pages: 0,
  //   }
  // },
}

const initialState = {
  ...initialFetchingState,
  ...initialUserState,
  sightings: {
    ...initialUserSightingsState,
  },
}

/* FETCHING */

const resetFetching = (state, action) => ({ ...state, ...initialFetchingState })

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

/* USER SIGHTINGS */

const userSightingsStart = (state, action) => ({
  ...state,
  ...initialFetchingState,
  isFetching: true,
})
const userSightingsSuccess = (state, action) => ({
  ...state,
  ...initialFetchingState,
  sightings: action.payload,
})
const userSightingsFailed = (state, action) => ({
  ...state,
  ...initialFetchingState,
  error: action.payload.error,
})

/* SLICE */

const SLICE_NAME = 'user'

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    resetFetching,
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
    // userSightings
    userSightingsStart,
    userSightingsSuccess,
    userSightingsFailed,
  },
})

export const { reducer, actions } = slice

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

// FIX: Fetch PUT here doesn't work because of CORS
export const updateUser = ({ body } = {}) => (dispatch, getState) =>
  new Promise((fulfill, reject) => {
    if (checkIsFetching({ getState, SLICE_NAME, reject, error: 'Already updating profile' })) {
      return
    }

    const { onStart, onSuccess, onFailed } = fetchActions({ actions, THUNK_NAME: 'updateUser' })

    dispatch(onStart())

    const state = getState()
    const { auth_token } = state.user
    const options = {
      ...optionsPut,
      headers: { ...optionsPut.headers, Authorization: `Bearer ${auth_token}` },
      body: JSON.stringify(body),
    }
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

    const mockResponseSuccess = new Response(JSON.stringify({ auth_token: null }), { status: 200 })
    // const mockResponseFailed = new Response(JSON.stringify('Server error'), { status: 400 })
    const request = () => mockResponseSuccess

    handleFetch({ dispatch, request, fulfill, reject, onSuccess, onFailed })
  })

export const userSightings = () => (dispatch, getState) =>
  new Promise((fulfill, reject) => {
    if (checkIsFetching({ getState, SLICE_NAME, reject, error: 'Already getting user info' })) {
      return
    }

    const { onStart, onSuccess, onFailed } = fetchActions({ actions, THUNK_NAME: 'userSightings' })

    dispatch(onStart())

    const state = getState()
    const { auth_token, user } = state.user
    const { id } = user

    const options = {
      ...optionsGet,
      /* prettier-ignore */
      headers: { ...optionsGet.headers, 'Authorization': `Bearer ${auth_token}` }
    }

    const endpoint = userSightingsUrl({ id })
    const request = () => fetch(endpoint, options)

    handleFetch({ dispatch, request, fulfill, reject, onSuccess, onFailed })
  })
