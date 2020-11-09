const notificationReducer = ( state = '', action ) => {

  switch(action.type) {

    case 'NOTIFICATION':
      return action.text

    case 'END':
      return ''

    default: 
      return state
  }
}



export const notification = text => {
  return {
    type: 'NOTIFICATION',
    text 
  }
}

export const endNotification = () => {
  return {
    type: 'END'
  }
}

export default notificationReducer