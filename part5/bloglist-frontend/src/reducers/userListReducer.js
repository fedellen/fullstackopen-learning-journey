import userListService from '../services/userList'

const userListReducer = (state = [], action) => {
  if (action.type === 'INIT_USER_LIST') {
    return action.data
  }
  return state
}

export const getUserList = () => {
  return async (dispatch) => {
    const userList = await userListService.getUserList()
    dispatch({ type: 'INIT_USER_LIST', data: userList })
  }
}

export default userListReducer
