import React, { useEffect } from 'react'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

// Components
import BlogList from './components/BlogList'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  // Get the blogs, formats array to better use API (user: id)
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // Check if user is logged in, set token if true...
  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  /*
  const handleLogout = () => {
    window.localStorage.removeItem('blogUserLogin')
    dispatch(notify(`${user.name} has been logged out`))
    setUser(null)
  }*/

  return (
    <div>
      <Notification />
      {user === null ? (
        <Login />
      ) : (
        <div>
          {user.name} is logged in
          <br />
          {/*  <button onClick={handleLogout} >Logout</button>*/}
          <hr />
          <Togglable buttonLabel={'Add New Blog'}>
            <NewBlog />
          </Togglable>
          <hr />
          <BlogList />
          {/*
          <div id='theBlogs'>
            <h2>The Blogs</h2>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                likeBlog={likeBlog}
                user={user}
                handleDelete={handleDelete}
              />
            ))}
          </div>
            */}
        </div>
      )}
    </div>
  )
}

export default App
