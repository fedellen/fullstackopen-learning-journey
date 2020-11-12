import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [hidden, setHidden] = useState(true)

  const blogStyle = {
    padding: 20,
    textAlign: 'center',
    border: 'solid',
    borderWidth: 2,
    margin: 10
  }

  const handleDelete = (blog) => {
    if (
      window.confirm(
        `Are you sure you want to remove ${blog.title} by ${blog.author}`
      )
    ) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div className='theBlog' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>

      {hidden ? (
        <button onClick={() => setHidden(false)}>View</button>
      ) : (
        <div>
          <button onClick={() => setHidden(true)}>Hide</button>
          <p>{blog.url}</p>
          <p>
            Likes: {blog.likes}
            {user && (
              <button onClick={() => dispatch(likeBlog(blog))}>💖</button>
            )}
          </p>
          {user.id === blog.user && (
            <button onClick={() => handleDelete(blog)}>remove blog</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
