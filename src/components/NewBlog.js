import React, { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const NewBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleAddBlog = (e) => {
    e.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    dispatch(createBlog(blogObject))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleAddBlog}>
        Title:{' '}
        <input
          id='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        Author:{' '}
        <input
          id='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        Url:{' '}
        <input
          id='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <button id='createBlog' type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}

export default NewBlog
