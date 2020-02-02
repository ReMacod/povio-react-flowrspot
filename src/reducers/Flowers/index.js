import { createSlice } from '@reduxjs/toolkit'

import { options } from '../../api/fetch'
import { flowers } from '../../api/endpoints'

import { withIsFetching, handleFetchStart, handleFetchEndDelayed } from '../fetch'

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

const fetchFlowersStart = (state, action) => withIsFetching({ state, isFetching: true })

const fetchFlowersSuccess = (state, action) => {
  const { payload: flowers } = action

  return withIsFetching({ state: flowers, isFetching: false })
}

const fetchFlowersFailed = (state, action) => withIsFetching({ state, isFetching: false })

const flowersSlice = createSlice({
  name: 'flowers',
  initialState,
  reducers: {
    fetchFlowersStart,
    fetchFlowersSuccess,
    fetchFlowersFailed,
  },
})

export const { reducer, actions } = flowersSlice

export const fetchFlowers = ({ page = 0 } = {}) => async (dispatch, getState) => {
  const state = getState()

  if (state.flowers.isFetching) {
    return
  }

  const {
    fetchFlowersStart: start,
    fetchFlowersSuccess: success,
    fetchFlowersFailed: failed,
  } = actions

  handleFetchStart({ dispatch, start })

  const request = () => fetch(flowers, options)

  handleFetchEndDelayed({ delay: 600, dispatch, request, success, failed })
}
