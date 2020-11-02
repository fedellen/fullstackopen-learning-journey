const dummyBlog = require ('./dummyBlogs')
const dummyBlogs = dummyBlog.dummyBlogs
const Blog = require ('../models/blog')
const User = require ('../models/user')

const theBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const theUsers = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  dummyBlogs,
  theBlogs,
  theUsers
}