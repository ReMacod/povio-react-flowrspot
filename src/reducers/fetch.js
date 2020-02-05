import { actions as loadingActions } from './Loading'
const { loadingStart, loadingEnding, loadingEnd } = loadingActions

/* IS_FETCHING */

export const withIsFetchingTrue = ({ state }) => ({ ...state, isFetching: true })
export const withIsFetchingFalse = ({ state }) => ({ ...state, isFetching: false })

/* ERROR */

export const withError = ({ state, error }) => ({ ...state, error })

/* DISPATCH MULTIPLE */

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

/* FETCH */

export const handleFetchStart = ({ dispatch, start, loadingConfig = {} }) => {
  dispatch(loadingStart(loadingConfig))
  dispatch(start())
}

export const handleFetchEnd = async ({ dispatch, request, success, failed }) => {
  try {
    const response = await request()
    const { status } = response

    if (status !== 200) {
      const jsonError = await response.json()
      dispatchMultipleWithEnd({ dispatch, actions: failed, data: jsonError })
      return
    }

    const jsonData = await response.json()

    dispatchMultipleWithEnd({ dispatch, actions: success, data: jsonData })
  } catch (error) {
    const message = (error || {}).message || 'Something went wrong'
    dispatchMultipleWithEnd({ dispatch, actions: failed, data: message })
  }
}

export const handleFetchEndDelayed = ({ delay = 500, dispatch, request, success, failed }) => {
  dispatch(loadingEnding())

  setTimeout(() => {
    handleFetchEnd({ dispatch, request, success, failed })
  }, delay)
}
