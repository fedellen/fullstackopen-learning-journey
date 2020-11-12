import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.data

    case 'LOGIN_USER':
      return action.data

    case 'LOGOUT_USER':
      return null

    default:
      return state
  }
}

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('blogUserLogin')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({ type: 'INIT_USER', data: user })
    }
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('blogUserLogin', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({ type: 'LOGIN_USER', data: user })
      dispatch(notify(`Welcome back ${user.name}`))
    } catch (err) {
      dispatch(notify('Wrong username or password credentials'))
    }
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('blogUserLogin')
  return (dispatch) => {
    dispatch({ type: 'LOGOUT_USER' })
    dispatch(notify('You have been logged out'))
  }
}

export default userReducer
