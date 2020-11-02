const mongoose = require ('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require ('../app')
const api = supertest(app)
const Blog = require ('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.dummyBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('the blogs are json and return the correct amount', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.theBlogs()
  expect(blogs).toHaveLength(helper.dummyBlogs.length)
})

test('specific blog schema uses id rather than __id', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.theBlogs()
  expect(blogs[0].id).toBeDefined()
  expect(blogs[0]._id).not.toBeDefined()
})

test('correctly saves blog content to the list', async () => {

  const newBlog = {
    title: 'Jest testing is very easy!',
    author: 'Derek R Sonnenberg',
    url: 'https://pixelpajamastudios.com/jest-testing-is-easy',
    likes: 17,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.theBlogs()
  const blogTitles = blogsAfter.map(b => b.title)

  expect(blogsAfter).toHaveLength(helper.dummyBlogs.length + 1)
  expect(blogTitles).toContain('Jest testing is very easy!')
})

afterAll(() => {
  mongoose.connection.close()
})