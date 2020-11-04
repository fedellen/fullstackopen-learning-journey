import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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
    setUser(null)
  }

  return (
    <div>
      {user === null
        ? <Login user={user} setUser={setUser} />  :
        <div>
          {user.name} is logged in<br />
          <button onClick={handleLogout}>Logout</button>
          <hr />
          <NewBlog blogs={blogs} setBlogs={setBlogs} />
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