import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blog)

  // If these do not exist, don't run the errors
  if (!blogs || !id) {
    return null
  }

  const blog = blogs.find((blog) => blog.id.toString() === id.toString())

  // If no blog is found, don't error
  if (!blog) {
    return null
  }

  const handleDelete = (blog) => {
    if (
      // Standard browser confirm
      window.confirm(
        `Are you sure you want to remove ${blog.title} by ${blog.author}`
      )
    ) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div className='theBlog'>
      <h2>{blog.title}</h2>
      <h3> by {blog.author}</h3>
      <div>
        Likes: {blog.likes}
        {user && <button onClick={() => dispatch(likeBlog(blog))}>💖</button>}
      </div>
      <div>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>Added by {blog.user.name}</p>
        {user.id === blog.user.id && (
          <button onClick={() => handleDelete(blog)}>remove blog</button>
        )}
        <p>
          <Link to={'/'}>Back to Blog List</Link>
        </p>
      </div>
    </div>
  )
}

export default Blog
