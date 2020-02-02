import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isEnding: false,
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loadingStart: (state, action) => ({ isLoading: true, isEnding: false }),
    loadingEnding: (state, action) => ({ isLoading: true, isEnding: true }),
    loadingEnd: (state, action) => ({ isLoading: false, isEnding: false }),
  },
})

export const { reducer, actions } = loadingSlice
