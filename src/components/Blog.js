import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const [hidden, setHidden] = useState(true)

  const blogStyle = {
    padding: 20,
    textAlign: 'center',
    border: 'solid',
    borderWidth: 2,
    margin: 10
  }

  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
      .then(dispatch(notify(`You liked ${blog.title}!`)))
      .catch(() => dispatch(notify('Request failed...')))
  }

  const deleteButton = () => {
    if (user) {
      if (user.id === blog.user) {
        return (
          <button /*onClick={() => handleDelete(blog)}*/>remove blog</button>
        )
      }
    }
  }

  return (
    <div className='theBlog' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        {hidden ? (
          <button onClick={() => setHidden(false)}>View</button>
        ) : (
          <div>
            <button onClick={() => setHidden(true)}>Hide</button>
            <p>{blog.url}</p>
            <p>
              Likes: {blog.likes}
              <button onClick={() => handleLike(blog)}>💖</button>
            </p>
            {deleteButton()}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
