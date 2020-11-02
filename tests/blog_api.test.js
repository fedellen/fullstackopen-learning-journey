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


afterAll(() => {
  mongoose.connection.close()
})