import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Initialize redux states
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { getUserList } from './reducers/userListReducer'

// Components
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import SingleUser from './components/SingleUser'
import Notification from './components/Notification'
import Nav from './components/Nav'
import Login from './components/Login'

const App = () => {
  const dispatch = useDispatch()

  // Get the blogs, formats array to better use API (user: id)
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // Check if user is logged in, set token if true...
  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  // Get user list; --> NOT <-- for logged in user
  useEffect(() => {
    dispatch(getUserList())
  }, [dispatch])

  return (
    <div>
      <Notification />
      <Router>
        <Nav />
        <div className='container mx-auto px-4'>
          <Switch>
            <Route path='/users/:id'>
              <SingleUser />
            </Route>
            <Route path='/blogs/:id'>
              <Blog />
            </Route>
            <Route path='/users'>
              <UserList />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/'>
              <BlogList />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
