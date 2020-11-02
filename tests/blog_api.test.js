const mongoose = require ('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require ('../app')
const api = supertest(app)
const Blog = require ('../models/blog')
const User = require ('../models/user')
const bcrypt = require ('bcrypt')

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

test('blogs are deleted by ID, respond 204', async () => {
  const blogId = helper.dummyBlogs[0]._id

  await api
    .delete(`/api/blogs/${blogId}`)
    .expect(204)

  const blogsAfter = await helper.theBlogs()
  const allBlogId = blogsAfter.map(b => b.id)

  expect(blogsAfter).toHaveLength(helper.dummyBlogs.length - 1)
  expect(allBlogId).not.toContain(blogId)
})

test('blogs can be updated alot by likes', async () => {
  const blogToUpdate = helper.dummyBlogs[0]
  const blogId = blogToUpdate._id

  const blog = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: 17
  }

  await api
    .put(`/api/blogs/${blogId}`)
    .send(blog)
    .expect(200)

  const blogsAfter = await helper.theBlogs()
  const ourBlog = blogsAfter.find(b => b.id === blogId)
  expect(ourBlog.likes).toBe(17)
  console.log(ourBlog)
})

describe('when there is one user to begin with', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('seecrit', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('user creation succeeds', async () => {
    const usersBefore = await helper.theUsers()

    const newUser = {
      username: 'fedellen',
      name: 'Derek R Sonnenberg',
      password: 'secretnumbers'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.theUsers()
    expect(usersAfter).toHaveLength(usersBefore.length + 1)

    const usernames = usersAfter.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user creation fails when username exists', async () => {
    const usersBefore = await helper.theUsers()

    const newUser = {
      username: 'root',
      name: 'this is failure',
      password: 'secretnumbersagain'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAfter = await helper.theUsers()
    expect(usersAfter).toHaveLength(usersBefore.length)
  })

  test('user creation fails when shorter than 4 characters', async () => {
    const usersBefore = await helper.theUsers()

    const newUser = {
      username: 'fed',
      name: 'Failed It',
      password: 'secretnumbersyetagain'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('must have 4 or more characters')

    const usersAfter = await helper.theUsers()
    expect(usersAfter).toHaveLength(usersBefore.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})