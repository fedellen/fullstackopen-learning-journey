import React, { useState } from 'react'


const Blog = ({ blog, likeBlog, handleDelete, user }) => {

  const [ hidden, setHidden ] = useState(true)

  const blogStyle = {
    padding: 20,
    textAlign: 'center',
    border: 'solid',
    borderWidth: 2,
    margin: 10
  }

  const handleLike = blog => {

    const likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes + 1,
      id: blog.id
    }

    likeBlog(likedBlog)
  }

  const deleteButton = () => {
    if (user) {
      if (user.id === blog.user) {
        return <button onClick={() => handleDelete(blog)}>remove blog</button>
      }
    }
  }

  return(
    <div className='theBlog' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        { hidden
          ? <button onClick={() => setHidden(false)}>View</button>
          : <div>
            <button onClick={() => setHidden(true)}>Hide</button>
            <p>{blog.url}</p>
            <p>Likes: {blog.likes}<button onClick={() => handleLike(blog)}>💖</button></p>
            { deleteButton() }
          </div>
        }
      </div>
    </div>
  )}

export default Blog
