import React, { useState } from 'react'

const NewBlog = ({ addBlog }) => {

  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  const handleAddBlog = e => {
    e.preventDefault()

    const blogObject = {
      title   : title,
      author  : author,
      url     : url
    }

    addBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleAddBlog}>
        Title: <input id='title' value={title} onChange={({ target }) => setTitle(target.value)} /><br />
        Author: <input id='author' value={author} onChange={({ target }) => setAuthor(target.value)} /><br />
        Url: <input id='url' value={url} onChange={({ target }) => setUrl(target.value)}  /><br />
        <button type="submit">Create</button>
      </form>
    </div>

  )
}



export default NewBlog