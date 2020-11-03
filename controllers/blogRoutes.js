const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  const body = req.body
  const user = await User.find({})
  const theUser = user[0]

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: theUser._id,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  theUser.blogs = theUser.blogs.concat(savedBlog._id)
  await theUser.save()

  res.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {

  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0
  }

  await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.status(200).json(blog)
})

module.exports = blogRouter