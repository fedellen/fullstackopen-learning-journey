import React from 'react'



const Notification = ({ message, messageColor }) => {

  const style = {
    color: messageColor,
    background: 'lightgrey',
    fontSize: 32,
    borderStyle: 'solid',
    borderRadius: 10,
    margin: 50,
    padding: 40
  }

  if (message === null) {
    return null
  }

  return (
    <div style={style} >
      {message}
    </div>
  )

}

export default Notification