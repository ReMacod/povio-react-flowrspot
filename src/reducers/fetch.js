import { actions as loadingActions } from './Loading'

const { loadingStart, loadingEnding, loadingEnd } = loadingActions

export const withIsFetching = ({ state, isFetching }) => ({ ...state, isFetching })

export const handleFetchStart = ({ dispatch, start }) => {
  dispatch(loadingStart())
  dispatch(start())
}

const dispatchMultiple = ({ dispatch, actions, data }) => {
  if (Array.isArray(actions)) {
    actions.forEach(action => {
      dispatch(action(data))
    })
    return
  }

  dispatch(actions(data))
}

const dispatchMultipleWithEnd = ({ dispatch, actions, data }) => {
  dispatch(loadingEnd())

  dispatchMultiple({ dispatch, actions, data })
}

export const handleFetchEnd = async ({ dispatch, request, success, failed }) => {
  try {
    const response = await request()
    const { status, body } = response

    if (status !== 200) {
      dispatchMultipleWithEnd({ dispatch, actions: failed, data: body })
      return
    }

    const jsonData = await response.json()

    dispatchMultipleWithEnd({ dispatch, actions: success, data: jsonData })
  } catch (error) {
    dispatchMultipleWithEnd({ dispatch, actions: failed, data: error })
  }
}

export const handleFetchEndDelayed = ({ delay = 300, dispatch, request, success, failed }) => {
  dispatch(loadingEnding())

  setTimeout(() => {
    handleFetchEnd({ dispatch, request, success, failed })
  }, delay)
}
