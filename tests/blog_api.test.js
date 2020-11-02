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

test('blog submitted without likes value defaults to 0', async () => {

  const newBlog = {
    title: 'Supertest!',
    author: 'Derek R Sonnenberg',
    url: 'https://pixelpajamastudios.com/10-reasons-for-supertest'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.theBlogs()
  const blogTitles = blogsAfter.map(b => b.title)
  const theNewBlog = blogsAfter.find(b => b.title === 'Supertest!')

  expect(blogsAfter).toHaveLength(helper.dummyBlogs.length + 1)
  expect(blogTitles).toContain('Supertest!')
  expect(theNewBlog.likes).toBe(0)
})

test('blogs submitted without titles are not added', async () => {

  const noTitleBlog = {
    author: 'Derek R Sonnenberg',
    url: 'https://pixelpajamastudios.com/urlthings',
    likes: 18
  }

  await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .expect(400)

  const blogsAfter = await helper.theBlogs()
  expect(blogsAfter).toHaveLength(helper.dummyBlogs.length)
})

test('blogs submitted without urls are not added', async () => {

  const noUrlBlog = {
    title: 'Space is lovely.',
    author: 'Derek R Sonnenberg',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(noUrlBlog)
    .expect(400)

  const blogsAfter = await helper.theBlogs()
  expect(blogsAfter).toHaveLength(helper.dummyBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})