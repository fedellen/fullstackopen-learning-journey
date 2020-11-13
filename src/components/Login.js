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
    <form onSubmit={handleLogin}>
      <p>
        <input {...username} placeholder='username' />
      </p>
      <p>
        <input {...password} placeholder='password' />
      </p>
      <button type='submit'>login</button>
    </form>
  )
}

export default Login
