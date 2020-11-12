import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'

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

  return (
    <div>
      <Notification />
      <Login />
      {user && (
        <Togglable buttonLabel={'Add New Blog'}>
          <NewBlog />
        </Togglable>
      )}
      <hr />
      <BlogList />
    </div>
  )
}

export default App
