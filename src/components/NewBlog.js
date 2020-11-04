import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlog = ({ blogs, setBlogs, newMessage }) => {
  
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  const addBlog = async e => {
    e.preventDefault()

    const blogObject = {
      title   : title,
      author  : author,
      url     : url, 
    }

    try {
      const blog = await blogService.createBlog(blogObject)
      setBlogs(blogs.concat(blog))
      newMessage(`${title} by ${author} has been added!`, 'green')
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log(exception)
      newMessage('Blog could not be added...')
    }
  }
  
  return(
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        Title: <input value={title} onChange={({ target }) => setTitle(target.value)} /><br />
        Author: <input value={author} onChange={({ target }) => setAuthor(target.value)} /><br />
        Url: <input value={url} onChange={({ target }) => setUrl(target.value)}  /><br />
        <button type="submit">Create</button>
      </form>
    </div>

  )
}

export default NewBlog 