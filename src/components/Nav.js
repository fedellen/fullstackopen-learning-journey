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

  return (
    <div className='h-12 bg-gray-900'>
      <div className='max-w-3xl flex content-center p-2'>
        <div className='flex-1'>
          <Link className='w-8' to='/'>
            blogs
          </Link>
        </div>
        <div className='flex-1'>
          <Link to='/users'>users</Link>
        </div>
        <div className='flex-1'>
          {user ? (
            <span>
              <em> {user.name} logged in </em>
              <button onClick={() => handleLogout()}>Logout</button>
            </span>
          ) : (
            <Link to='/login'>login</Link>
          )}
        </div>
      </div>
    </div>
  )
}
export default Nav
