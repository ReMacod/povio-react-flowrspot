import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders Flowrspot title', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Flowrspot/i)
  expect(linkElement).toBeInTheDocument()
})
