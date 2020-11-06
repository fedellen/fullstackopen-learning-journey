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
      const sortedBlogs = formattedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs( sortedBlogs )
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

  const handleDelete = async blog => {

    if (window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author}`))
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id
        ))
        newMessage('Blog has been deleted')
      } catch (exception) {
        console.log(`Here is the exception: ${exception}`)
        newMessage('Blog could not be deleted...')
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
        ? <Login setUser={setUser} newMessage={newMessage} />  :
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
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} user={user} handleDelete={handleDelete} />
          )}
        </div>
      }
    </div>
  )
}

export default App