import { createSlice } from '@reduxjs/toolkit'

import { withDelay } from '../../utils/Delay'

export let messageComponents = {
  // someMessage: <Alert key="someMessage">This is a success alert — check it out!</Alert>,
  // someMessage2: <Alert key="someMessage2">This is a success alert — check it out!</Alert>,
}

const AUTOHIDE_DURATION = 7000

const initialState = {
  messages: {
    // someMessage: {
    //   isOpen: true,
    // },
    // someMessage2: {
    //   isOpen: false,
    // },
  },
}

const SLICE_NAME = 'messages'

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addMessage: (state, action) => ({
      messages: {
        ...state.messages,
        ...action.payload,
      },
    }),
    setIsOpenMessage: (state, action) => {
      const { messageKey, isOpen } = action.payload

      return {
        messages: {
          ...state.messages,
          [messageKey]: {
            ...state.messages[messageKey],
            isOpen,
          },
        },
      }
    },
  },
})

export const { reducer, actions } = slice

export const showMessage = ({ messageKey }) => (dispatch, getState) => {
  dispatch(actions.setIsOpenMessage({ messageKey, isOpen: true }))
}

export const hideMessage = ({ messageKey }) => (dispatch, getState) => {
  const state = getState()
  const { messages } = state[SLICE_NAME]
  const { autohideTimeout } = messages[messageKey] || {}

  if (autohideTimeout) clearTimeout(autohideTimeout)

  dispatch(actions.setIsOpenMessage({ messageKey, isOpen: false }))
}

export const hideAllMessages = () => (dispatch, getState) => {
  const state = getState()
  const { messages } = state[SLICE_NAME]

  Object.keys(messages).forEach(messageKey => {
    dispatch(hideMessage({ messageKey }))
  })
}

export const addMessage = ({ messageKey, component }) => (dispatch, getState) => {
  messageComponents[messageKey] = component

  const message = {
    [messageKey]: {
      isOpen: false,
      autohideTimeout: setTimeout(() => {
        dispatch(hideMessage({ messageKey }))
      }, AUTOHIDE_DURATION),
    },
  }

  dispatch(actions.addMessage(message))
  withDelay({ func: () => dispatch(showMessage({ messageKey })) })
}
