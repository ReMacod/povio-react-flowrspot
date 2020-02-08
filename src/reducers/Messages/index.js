import { createSlice } from '@reduxjs/toolkit'

export let messageComponents = {
  // key: <Alert key="key">This is a success alert — check it out!</Alert>,
  // key2: <Alert key="key2">This is a success alert — check it out!</Alert>,
}

const initialState = {
  messageKeys: {
    // key: true,
    // key2: false,
  },
}

const SLICE_NAME = 'messages'

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addMessageKey: (state, action) => ({
      messageKeys: {
        ...state.messageKeys,
        [action.payload]: true,
      },
    }),
    removeMessageKey: (state, action) => ({
      messageKeys: {
        ...state.messageKeys,
        [action.payload]: false,
      },
    }),
  },
})

export const { reducer, actions } = slice

export const addMessage = ({ key, component }) => (dispatch, getState) => {
  messageComponents[key] = component

  dispatch(actions.addMessageKey(key))
}

export const removeMessage = ({ key }) => (dispatch, getState) => {
  messageComponents[key] = null

  dispatch(actions.removeMessageKey(key))
}
