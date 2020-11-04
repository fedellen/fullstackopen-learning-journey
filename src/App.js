import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ message, setMessage ] = useState(null)
  const [ messageColor, setMessageColor ] = useState('red')

  const newMessage = (message, color) => {
    color ? setMessageColor(color) : setMessageColor('red')
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUserLogin')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('blogUserLogin')
    newMessage(`${user.name} has been logged out`, 'green')
    setUser(null)
  }

  return (
    <div>
      <Notification message={message} messageColor={messageColor} />
      {user === null
        ? <Login user={user} setUser={setUser} newMessage={newMessage} />  :
        <div>
          {user.name} is logged in<br />
          <button onClick={handleLogout}>Logout</button>
          <hr />
          <NewBlog blogs={blogs} setBlogs={setBlogs} newMessage={newMessage} />
          <hr />
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App