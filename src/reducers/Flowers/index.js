import { createSlice } from '@reduxjs/toolkit'

import { options } from '../../api/fetch'
import { flowers, flowersSearch } from '../../api/endpoints'

import {
  withIsFetchingTrue,
  withIsFetchingFalse,
  handleFetchStart,
  handleFetchStartMinimal,
  handleFetchEndDelayed,
} from '../fetch'

const initialState = {
  isFetching: false,
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
  meta: {
    pagination: {
      current_page: 0,
      prev_page: 0,
      next_page: 0,
      total_pages: 0,
    },
  },
}

/* LIST */

const listFlowersStart = (state, action) => withIsFetchingTrue({ state })

const listFlowersSuccess = (state, action) => {
  const { payload: flowers } = action

  return withIsFetchingFalse({ state: flowers })
}

const listFlowersFailed = (state, action) => withIsFetchingFalse({ state })

/* SEARCH */

const searchFlowersStart = (state, action) => withIsFetchingTrue({ state })

const searchFlowersSuccess = (state, action) => {
  const { payload: flowers } = action

  return withIsFetchingFalse({ state: flowers })
}

const searchFlowersFailed = (state, action) => withIsFetchingFalse({ state })

/* SLICE */

const flowersSlice = createSlice({
  name: 'flowers',
  initialState,
  reducers: {
    listFlowersStart,
    listFlowersSuccess,
    listFlowersFailed,
    searchFlowersStart,
    searchFlowersSuccess,
    searchFlowersFailed,
  },
})

export const { reducer, actions } = flowersSlice

/* ACTIONS */

export const listFlowers = ({ page = 0 } = {}) => async (dispatch, getState) => {
  const state = getState()

  if (state.flowers.isFetching) {
    return
  }

  const {
    listFlowersStart: start,
    listFlowersSuccess: success,
    listFlowersFailed: failed,
  } = actions

  handleFetchStart({ dispatch, start })

  const request = () => fetch(flowers, options)

  setTimeout(() => {
    handleFetchEndDelayed({ dispatch, request, success, failed })
  }, 300)
}

export const searchFlowers = ({ query = '' } = {}) => async (dispatch, getState) => {
  const state = getState()

  if (state.flowers.isFetching) {
    return
  }

  const {
    searchFlowersStart: start,
    searchFlowersSuccess: success,
    searchFlowersFailed: failed,
  } = actions

  handleFetchStartMinimal({ dispatch, start })

  const endpoint = `${flowersSearch}?query=${query}`
  const request = () => fetch(endpoint, options)

  handleFetchEndDelayed({ dispatch, request, success, failed })
}
