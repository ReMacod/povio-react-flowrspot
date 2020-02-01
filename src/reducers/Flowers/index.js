import { createSlice } from '@reduxjs/toolkit'

import { options } from '../../api/fetch'
import { flowers } from '../../api/endpoints'

import { handleFetch } from '../fetch'

const initialState = {
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

const fetchFlowersSuccess = (state, action) => {
  const { payload: flowers } = action

  return flowers
}

const fetchFlowersFailed = (state, action) => state

const flowersSlice = createSlice({
  name: 'flowers',
  initialState,
  reducers: {
    fetchFlowersSuccess,
    fetchFlowersFailed,
  },
})

export const { reducer, actions } = flowersSlice

export const fetchFlowers = ({ page = 0 } = {}) => async (dispatch, getState) => {
  const { fetchFlowersSuccess: success, fetchFlowersFailed: failed } = actions

  const request = () => fetch(flowers, options)

  handleFetch({ dispatch, request, success, failed })
}

export default flowersSlice
