import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    background: 'lightgrey',
    fontSize: 32,
    borderStyle: 'solid',
    borderRadius: 10,
    margin: 50,
    padding: 40
  }

  const notification = useSelector((state) => state.notification)

  if (notification) {
    return <div style={style}>{notification}</div>
  }

  return <div></div>
}

export default Notification
