import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loadingStart: (state, action) => ({ isLoading: true }),
    loadingEnd: (state, action) => ({ isLoading: false }),
  },
})

export const { reducer, actions } = loadingSlice
