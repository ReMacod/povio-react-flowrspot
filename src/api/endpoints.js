export const API = process.env.REACT_APP_API

const flowers = 'flowers'
export const flowersList = `${API}/${flowers}`
export const flowersSearch = `${API}/${flowers}/search`

const sightings = 'sightings'
export const sightingsList = `${API}/${sightings}`

const users = 'users'
export const usersRegister = `${API}/${users}/register`
export const usersLogin = `${API}/${users}/login`
export const usersMe = `${API}/${users}/me`
export const userSightings = ({ id }) => `${API}/${users}/${id}/${sightings}`
