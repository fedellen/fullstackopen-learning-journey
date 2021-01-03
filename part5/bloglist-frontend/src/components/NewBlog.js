import React from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'

const NewBlog = () => {
  const title = useField('title')
  const author = useField('author')
  const url = useField('url')
  const dispatch = useDispatch()

  const handleAddBlog = (e) => {
    e.preventDefault()

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    dispatch(createBlog(blogObject))
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleAddBlog}>
        Title:
        <input {...title} placeholder='Amazing Blog' />
        <br />
        Author:
        <input {...author} placeholder='Great Author' />
        <br />
        Url:
        <input {...url} placeholder='http://www.example.com' />
        <br />
        <button id='createBlog' type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}

export default NewBlog
