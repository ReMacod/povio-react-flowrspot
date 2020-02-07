import { createSlice } from '@reduxjs/toolkit'

import { optionsGet } from '../../api/fetch'
import { flowersList, flowersSearch } from '../../api/endpoints'

import { fetchActions, checkIsFetching, handleFetch, delayLoadingEnd } from '../fetch'

import { actions as loadingActions } from '../Loading'
const { loadingStart, loadingEnding, loadingEnd } = loadingActions

/* STATE */

const initialFetchingState = {
  isFetching: false,
  error: null,
}

const initialState = {
  ...initialFetchingState,
  flowers: [
    // {
    //   id: 0,
    //   name: 'string',
    //   latin_name: 'string',
    //   sightings: 0,
    //   profile_picture: 'string',
    //   favorite: true,
    // },
  ],
  // meta: {
  //   pagination: {
  //     current_page: 0,
  //     prev_page: 0,
  //     next_page: 0,
  //     total_pages: 0,
  //   },
  // },
}

/* FETCHING */

const resetFetching = (state, action) => ({ ...state, ...initialFetchingState })

/* LIST */

const listFlowersStart = (state, action) => ({
  ...state,
  ...initialFetchingState,
  isFetching: true,
})
const listFlowersSuccess = (state, action) => ({
  ...state,
  ...initialFetchingState,
  flowers: action.payload.flowers,
})
const listFlowersFailed = (state, action) => ({
  ...state,
  ...initialFetchingState,
  error: action.payload.error,
})

/* SEARCH */

const searchFlowersStart = (state, action) => ({
  ...state,
  ...initialFetchingState,
  isFetching: true,
})
const searchFlowersSuccess = (state, action) => ({
  ...state,
  ...initialFetchingState,
  flowers: action.payload.flowers,
})
const searchFlowersFailed = (state, action) => ({
  ...state,
  ...initialFetchingState,
  error: action.payload.error,
})

/* SLICE */

const SLICE_NAME = 'flowers'

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    resetFetching,
    // listFlowers
    listFlowersStart,
    listFlowersSuccess,
    listFlowersFailed,
    // searchFlowers
    searchFlowersStart,
    searchFlowersSuccess,
    searchFlowersFailed,
  },
})

export const { reducer, actions } = slice

/* THUNKS */

export const listFlowers = ({ page = 0 } = {}) => (dispatch, getState) =>
  new Promise((fulfill, reject) => {
    if (checkIsFetching({ getState, SLICE_NAME, reject, error: 'Already getting flowers' })) {
      return
    }

    const { onStart, onSuccess, onFailed } = fetchActions({ actions, THUNK_NAME: 'listFlowers' })

    dispatch(onStart())
    dispatch(loadingStart())

    const request = () => fetch(flowersList, optionsGet)

    const onFulfill = result => {
      delayLoadingEnd({ dispatch, loadingEnding, loadingEnd })
      fulfill(result)
    }
    const onReject = error => {
      dispatch(loadingEnd())
      reject(error)
    }

    handleFetch({ dispatch, request, fulfill: onFulfill, reject: onReject, onSuccess, onFailed })
  })

export const searchFlowers = ({ query = '' } = {}) => (dispatch, getState) =>
  new Promise((fulfill, reject) => {
    if (checkIsFetching({ getState, SLICE_NAME, reject, error: 'Already searching flowers' })) {
      return
    }

    const { onStart, onSuccess, onFailed } = fetchActions({ actions, THUNK_NAME: 'searchFlowers' })

    dispatch(onStart())
    dispatch(loadingStart({ isMinimal: true }))

    const endpoint = `${flowersSearch}?query=${query}`
    const request = () => fetch(endpoint, optionsGet)

    const onFulfill = result => {
      dispatch(loadingEnd())
      fulfill(result)
    }

    const onReject = error => {
      dispatch(loadingEnd())
      reject(error)
    }

    handleFetch({ dispatch, request, fulfill: onFulfill, reject: onReject, onSuccess, onFailed })
  })
