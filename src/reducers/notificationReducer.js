const notificationReducer = ( state = '', action ) => {

  switch(action.type) {

    case 'NOTIFICATION':
      return action.data

    case 'END':
      if (action.id === state.id) {
        return ''
      }
      return state

    default: 
      return state
  }
}


let notifyId = 0
export const notify = ( text, seconds ) => {
  return dispatch => {
    const id = notifyId++
    dispatch(notification(id, text))

    const time = seconds * 1000
    setTimeout(() => {
      dispatch(endNotification(id))
    }, time)
  }
}

const notification = (id, text) => {
  return { type: 'NOTIFICATION', data: { id: id, text: text } }
} 

const endNotification = (id) => {
  return {
    type: 'END', id
  }
}

export default notificationReducer