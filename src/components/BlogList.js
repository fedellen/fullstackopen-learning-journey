import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import NewBlog from './NewBlog'
import Togglable from './Togglable'

const BlogList = () => {
  const blogs = useSelector((state) => state.blog)
  const user = useSelector((state) => state.user)

  return (
    <div>
      {user && (
        <Togglable buttonLabel={'Add New Blog'}>
          <NewBlog />
        </Togglable>
      )}
      <h2 className='text-4xl font-bold text-red-600 p-4'>The Blogs</h2>
      <div className='grid grid-cols-2 gap-3'>
        {blogs.map((blog) => (
          <div
            className='rounded-md font-bold text-1.5xl border-4 border-orange-300 p-4'
            key={blog.id}
          >
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogList
