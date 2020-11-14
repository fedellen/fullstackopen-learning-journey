import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import NewBlog from './NewBlog'
import Togglable from './Togglable'

const BlogList = () => {
  const blogs = useSelector((state) => state.blog)
  const user = useSelector((state) => state.user)

  return (
    <div className='text-lighter'>
      <h2 className='text-4xl font-bold  p-4'>The Blogs</h2>
      {user && (
        <Togglable buttonLabel={'Add New Blog'}>
          <NewBlog />
        </Togglable>
      )}
      <div className='grid grid-cols-2 gap-3'>
        {blogs.map((blog) => (
          <Link to={`/blogs/${blog.id}`}>
            <div
              className='rounded-3xl font-bold text-1.5xl border-4 border-light bg-medium p-4 h-full hover:bg-lighter hover:text-dark'
              key={blog.id}
            >
              {blog.title} by {blog.author}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BlogList
