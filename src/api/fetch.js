export const optionsGet = {
  method: 'GET',
  headers: {
    Accept: 'application/json, text/javascript, */*; q=0.01',
  },
}

export const optionsPost = {
  ...optionsGet,
  method: 'POST',
  headers: {
    ...optionsGet.headers,
    'Content-Type': 'application/json',
  },
}

export const optionsPut = {
  ...optionsPost,
  method: 'PUT',
  headers: {
    ...optionsGet.headers,
    'Content-Type': 'application/json',
  },
}
