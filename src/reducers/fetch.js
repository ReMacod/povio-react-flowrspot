import { actions as loadingActions } from './Loading'
const { loadingStart, loadingEnding, loadingEnd } = loadingActions

/* IS_FETCHING */

export const withIsFetchingTrue = ({ state }) => ({ ...state, isFetching: true })
export const withIsFetchingFalse = ({ state }) => ({ ...state, isFetching: false })

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

export const handleFetchStart = ({ dispatch, start }) => {
  dispatch(loadingStart())
  dispatch(start())
}

export const handleFetchStartMinimal = ({ dispatch, start }) => {
  dispatch(loadingStart({ isMinimal: true }))
  dispatch(start())
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

export const handleFetchEndDelayed = ({ delay = 500, dispatch, request, success, failed }) => {
  dispatch(loadingEnding())

  setTimeout(() => {
    handleFetchEnd({ dispatch, request, success, failed })
  }, delay)
}
