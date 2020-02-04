import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isEnding: false,
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loadingStart: (state, action) => ({
      ...state,
      isLoading: true,
      isEnding: false,
      ...action.payload,
    }),
    loadingEnding: (state, action) => ({
      ...state,
      isLoading: true,
      isEnding: true,
      ...action.payload,
    }),
    loadingEnd: (state, action) => ({
      ...state,
      isLoading: false,
      isEnding: false,
      ...action.payload,
    }),
  },
})

export const { reducer, actions } = loadingSlice
