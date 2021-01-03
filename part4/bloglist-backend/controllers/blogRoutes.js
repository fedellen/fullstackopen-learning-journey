const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  const body = req.body
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'Token is missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  // must populate all blog object responses    
  const responseBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })

  res.status(201).json(responseBlog)
})

blogRouter.delete('/:id', async (req, res) => {

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'Token is missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'Blog with that ID was not found.' })
  }

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } else {
    return res.status(403).json({ error: 'You do not have the correct permissions to delete that Blog.' })
  }
})

blogRouter.post('/:id/comments', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  console.log('blog', blog)
  const commentedBlog = { 
    title: blog.title,
    author: blog.author,
    user: blog.user,
    url: blog.url,
    likes: blog.likes,
    comments: [ ...blog.comments, req.body.content ]
  }
  console.log('commented', commentedBlog)
  const updatedBlog = await Blog 
    .findByIdAndUpdate(req.params.id, commentedBlog, { new: true })
    .populate('user', { username: 1, name: 1 })

  res.status(200).json(updatedBlog)
})

blogRouter.put('/:id', async (req, res) => {

  const blog = {
    title: req.body.title,
    author: req.body.author,
    user: req.body.user.id,
    url: req.body.url,
    likes: req.body.likes,
    comments: req.body.comments
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(req.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1 })
  
  // Have to re-populate to avoid front end errors and mongo
  res.status(200).json(updatedBlog)
})

module.exports = blogRouter