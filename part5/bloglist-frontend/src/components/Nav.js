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
    <div className='h-20 bg-medium  grid w-full grid-cols-3 text-2xl text-center  content-center '>
      <div className='grid content-center  sm:op'>
        <Link className='flex-1' to='/'>
          blogs
        </Link>
      </div>
      <div className='grid content-center'>
        <Link to='/users'>users</Link>
      </div>
      <div className='grid content-center'>
        {user ? (
          <div className='text-xs p-0 m-0'>
            <em> {user.name} logged in </em>
            <button className='p-1 m-0' onClick={() => handleLogout()}>
              Logout
            </button>
          </div>
        ) : (
          <Link to='/login'>login</Link>
        )}
      </div>
    </div>
  )
}
export default Nav
