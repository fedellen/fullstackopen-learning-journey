const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.text

    case 'END':
      return ''

    default:
      return state
  }
}

let timeoutId
export const notify = (text, seconds) => {
  return (dispatch) => {
    const time = seconds ? seconds * 1000 : 5000
    clearTimeout(timeoutId)

    dispatch({ type: 'NOTIFICATION', text })
    timeoutId = setTimeout(() => {
      dispatch({ type: 'END' })
    }, time)
  }
}

export default notificationReducer
