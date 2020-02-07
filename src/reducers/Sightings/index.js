import { createSlice } from '@reduxjs/toolkit'

import { optionsGet } from '../../api/fetch'
import { sightingsList } from '../../api/endpoints'

import { checkIsFetching, fetchActions, handleFetch } from '../fetch'

const initialFetchingState = {
  isFetching: false,
  error: null,
}

const initialState = {
  ...initialFetchingState,
  sightings: [
    // {
    //   id: 0,
    //   flower_id: 0,
    //   name: 'string',
    //   description: 'string',
    //   latitude: 0,
    //   longitude: 0,
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

/* LIST SIGHTINGS */

const listSightingsStart = (state, action) => ({
  ...state,
  ...initialFetchingState,
  isFetching: true,
})
const listSightingsSuccess = (state, action) => ({
  ...state,
  ...initialFetchingState,
  ...action.payload,
})
const listSightingsFailed = (state, action) => ({
  ...state,
  ...initialFetchingState,
  error: action.payload.error,
})

/* SLICE */

const SLICE_NAME = 'sightings'

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    listSightingsStart,
    listSightingsSuccess,
    listSightingsFailed,
  },
})

export const { reducer, actions } = slice

/* THUNKS */

export const listSightings = () => (dispatch, getState) =>
  new Promise((fulfill, reject) => {
    if (
      checkIsFetching({ getState, SLICE_NAME, reject, error: 'Already getting sightings list' })
    ) {
      return
    }

    const { onStart, onSuccess, onFailed } = fetchActions({ actions, THUNK_NAME: 'listSightings' })

    dispatch(onStart())

    const request = () => fetch(sightingsList, optionsGet)

    handleFetch({ dispatch, request, fulfill, reject, onSuccess, onFailed })
  })
