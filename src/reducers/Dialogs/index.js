import { createSlice } from '@reduxjs/toolkit'

import { hideAllMessages } from '../Messages'

export const dialogNames = {
  MAIN_MENU: 'MainMenu',
  SIGN_IN: 'SignIn',
  SIGN_UP: 'SignUp',
  PROFILE: 'Profile',
}

const SLICE_NAME = 'dialogs'
const DIALOG_LIST = 'dialogs'

const initialState = {
  [DIALOG_LIST]: {
    MainMenu: {
      isOpen: false,
    },
    SignIn: {
      isOpen: false,
    },
    SignUp: {
      isOpen: false,
    },
    Profile: {
      isOpen: false,
    },
  },
}

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setIsOpenDialog: (state, action) => {
      const { dialogKey, isOpen } = action.payload

      return {
        [DIALOG_LIST]: {
          ...state[DIALOG_LIST],
          [dialogKey]: {
            ...state.dialogs[dialogKey],
            isOpen,
          },
        },
      }
    },
  },
})

export const { reducer, actions } = slice

export const openDialog = ({ dialogKey }) => (dispatch, getState) => {
  dispatch(actions.setIsOpenDialog({ dialogKey, isOpen: true }))
  dispatch(hideAllMessages())
}

export const closeDialog = ({ dialogKey }) => (dispatch, getState) => {
  dispatch(actions.setIsOpenDialog({ dialogKey, isOpen: false }))
}

export const closeAllDialogs = () => (dispatch, getState) => {
  const state = getState()
  const dialogs = state[SLICE_NAME][DIALOG_LIST]

  Object.keys(dialogs).forEach(dialogKey => {
    dispatch(actions.setIsOpenDialog({ dialogKey, isOpen: false }))
  })
}
