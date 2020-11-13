import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'

const Nav = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const navStyle = {
    padding: 8
  }

  return (
    <div>
      <Link style={navStyle} to='/'>
        blogs
      </Link>
      <Link style={navStyle} to='/users'>
        users
      </Link>
      {user ? (
        <span style={navStyle}>
          <em> {user.name} logged in </em>
          <button onClick={() => handleLogout()}>Logout</button>
        </span>
      ) : (
        <Link style={navStyle} to='/login'>
          login
        </Link>
      )}
    </div>
  )
}
export default Nav
