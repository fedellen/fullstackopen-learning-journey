import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'
import { loginUser } from '../reducers/userReducer'

const Login = () => {
  const username = useField('username')
  const password = useField('password')
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(loginUser(username.value, password.value))
  }

  if (user) {
    history.push('/')
  }

  return (
    <form onSubmit={handleLogin} className='bg-dark rounded-3xl py-10 m-10'>
      <div>
        <h3 className='text-4xl font-bold'>Hello!</h3>
        <input {...username} placeholder='username' />
      </div>
      <div>
        <input {...password} placeholder='password' />
      </div>
      <button type='submit' className=''>
        login
      </button>
    </form>
  )
}

export default Login
