import React, { useState, useEffect } from 'react'

import { notify } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

// Components
import BlogList from './components/BlogList'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

// Services
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  // Currently working on 7.10 Redux step two
  // Blog reducer has been created
  // Getting ready to initialize list and refactor the things

  // Get the blogs, format array to better use API
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // Check if user is logged in, set token if true...
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUserLogin')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    try {
      const blog = await blogService.createBlog(blogObject)
      setBlogs(blogs.concat(blog))
      dispatch(notify(`${blog.title} by ${blog.author} has been added!`))
    } catch (exception) {
      dispatch(notify('Blog could not be added...'))
    }
  }

  const likeBlog = async (blogObject) => {
    try {
      const blog = await blogService.likeBlog(blogObject)
      setBlogs(blogs.map((b) => (b.id !== blogObject.id ? b : blog)))
      dispatch(notify(`You liked ${blog.title} by ${blog.author}!`))
    } catch (exception) {
      dispatch(notify('Blog could not be liked...'))
    }
  }

  const handleDelete = async (blog) => {
    if (
      window.confirm(
        `Are you sure you want to remove ${blog.title} by ${blog.author}`
      )
    )
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        dispatch(notify('Blog has been deleted'))
      } catch (exception) {
        dispatch(notify('Blog could not be deleted...'))
      }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogUserLogin')
    dispatch(notify(`${user.name} has been logged out`))
    setUser(null)
  }

  return (
    <div>
      <Notification />
      {user === null ? (
        <Login setUser={setUser} />
      ) : (
        <div>
          {user.name} is logged in
          <br />
          <button onClick={handleLogout}>Logout</button>
          <hr />
          <Togglable buttonLabel={'Add New Blog'}>
            <NewBlog addBlog={addBlog} />
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
