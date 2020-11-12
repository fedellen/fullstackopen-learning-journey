import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Blog from './Blog'
import NewBlog from './NewBlog'
import Togglable from './Togglable'

const BlogList = () => {
  const blogs = useSelector((state) => state.blog)
  const user = useSelector((state) => state.user)

  // You're about to link to each blog individually with the Router via Link

  const blogStyle = {
    padding: 20,
    textAlign: 'center',
    border: 'solid',
    borderWidth: 2,
    margin: 10
  }

  return (
    <div>
      {user && (
        <Togglable buttonLabel={'Add New Blog'}>
          <NewBlog />
        </Togglable>
      )}
      <h2>The Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
