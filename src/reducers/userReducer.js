import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.data

    default:
      return state
  }
}

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('blogUserLogin')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({ type: 'INIT_USER', data: user })
    }
  }
}

export default userReducer
