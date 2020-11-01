const dummyBlog = require ('./dummyBlogs')
const dummyBlogs = dummyBlog.dummyBlogs
const Blog = require ('../models/blog')

const theBlogs = async () => {
  const blogs = await Blog.find({})
  console.log('Here are the blogs: ', blogs)
  return blogs.map(b => b.toJSON())
}

module.exports = {
  dummyBlogs,
  theBlogs
}