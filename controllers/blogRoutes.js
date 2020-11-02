const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.post('/', async (request, res) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
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