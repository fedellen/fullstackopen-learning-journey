import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlog = ({ blogs, setBlogs }) => {
  
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

    const blog = await blogService.createBlog(blogObject)
    setBlogs(blogs.concat(blog))
    setTitle('')
    setAuthor('')
    setUrl('')
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