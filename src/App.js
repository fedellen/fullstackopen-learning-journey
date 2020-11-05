import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
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

  // Get the blogs, format array to better use API
  useEffect(() => {
    blogService.getAll().then(blogs => {
      const formattedBlogs = blogs.map(b => {
        return { ...b, user: b.user.id }
      }) 
      setBlogs( formattedBlogs )
    })  
  }, [])

  // Check if user is logged in, set token if true...
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUserLogin')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async blogObject => {

    try {
      const blog = await blogService.createBlog(blogObject)
      setBlogs(blogs.concat(blog))
      newMessage(`${blog.title} by ${blog.author} has been added!`, 'green')
      
    } catch (exception) {
      newMessage('Blog could not be added...')
    }
  }

  const likeBlog = async blogObject => {

    try {
      console.log(blogObject)
      const blog = await blogService.likeBlog(blogObject)
      setBlogs(blogs.map(b => b.id !== blogObject.id
        ? b
        : blog
      ))
      newMessage(`You liked ${blog.title} by ${blog.author}!`, 'blue')
    } catch (exception) {
      newMessage('Blog could not be liked...')
    }
  }

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
          <Togglable buttonLabel={'Add New Blog'}>
            <NewBlog addBlog={addBlog} />
          </Togglable>
          <hr />
          <h2>The Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
          )}
        </div>
      }
    </div>
  )
}

export default App