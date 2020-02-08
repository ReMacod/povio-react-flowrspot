import { createSlice } from '@reduxjs/toolkit'

export const dialogNames = {
  MAIN_MENU: 'MainMenu',
  SIGN_IN: 'SignIn',
  SIGN_UP: 'SignUp',
  PROFILE: 'Profile',
}

const initialState = {
  dialogs: {
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

const SLICE_NAME = 'dialogs'

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setIsOpen: (state, action) => ({
      dialogs: {
        ...state.dialogs,
        [action.payload.key]: {
          isOpen: action.payload.isOpen,
        },
      },
    }),
    closeAll: (state, action) => ({
      ...initialState,
    }),
  },
})

export const { reducer, actions } = slice
