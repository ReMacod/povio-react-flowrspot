/* ACTIONS */

export const fetchActions = ({ actions, THUNK_NAME }) => {
  /* prettier-ignore */
  return ({
    onStart: actions[`${THUNK_NAME}Start`],
    onSuccess: actions[`${THUNK_NAME}Success`],
    onFailed: actions[`${THUNK_NAME}Failed`],
  })
}

/* FETCH */

export const checkIsFetching = ({ getState, SLICE_NAME, reject, error }) => {
  const state = getState()

  const { isFetching } = state[SLICE_NAME]

  if (isFetching) {
    reject(new Error(error))
  }

  return isFetching
}

export const doFetch = ({ dispatch, request }) =>
  new Promise(async (fulfill, reject) => {
    try {
      const response = await request()
      const { status } = response
      const jsonResponse = await response.json()

      if (status !== 200) {
        reject(jsonResponse)
        return
      }

      fulfill(jsonResponse)
    } catch (error) {
      console.log('handleFetch error', error)

      const message = (error || {}).message || 'Something went wrong'
      const errorFormatted = { ...error, error: message }

      reject(errorFormatted)
    }
  })

export const handleFetch = ({ dispatch, request, fulfill, reject, onSuccess, onFailed }) => {
  const handleSuccess = result => {
    dispatch(onSuccess(result))
    fulfill(result)
  }

  const handleFailed = error => {
    dispatch(onFailed(error))
    reject(error)
  }

  doFetch({ dispatch, request })
    .then(handleSuccess)
    .catch(handleFailed)
}

/* LOADING */

export const delayLoadingEnd = ({ delay = 500, dispatch, loadingEnding, loadingEnd }) => {
  dispatch(loadingEnding())

  setTimeout(() => {
    dispatch(loadingEnd())
  }, delay)
}
