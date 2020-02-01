const dispatchMultiple = ({ dispatch, actions, data }) => {
  if (Array.isArray(actions)) {
    actions.forEach(action => {
      dispatch(action(data))
    })
    return
  }

  dispatch(actions(data))
}

export const handleFetch = async ({ dispatch, request, success, failed }) => {
  try {
    const response = await request()
    const { status, body } = response

    if (status !== 200) {
      dispatchMultiple({ dispatch, actions: failed, data: body })
      return
    }

    const jsonData = await response.json()

    dispatchMultiple({ dispatch, actions: success, data: jsonData })
  } catch (error) {
    dispatchMultiple({ dispatch, actions: failed, data: error })
  }
}
