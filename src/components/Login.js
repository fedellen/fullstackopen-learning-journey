import React, { useState } from 'react'
import loginService from '../services/login'
import blogsService from '../services/blogs'

const Login = ({
  setUser,
  newMessage
}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'blogUserLogin', JSON.stringify(user)
      )

      blogsService.setToken(user.token)

      setUser(user)
      newMessage(`Welcome back ${user.name}`, 'green')
      setUsername('')
      setPassword('')
    } catch (err) {
      newMessage('Wrong username or password credentials', 'red')
    }
  }

  return(
    <form onSubmit={handleLogin}>
      <div>
          username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
          password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login