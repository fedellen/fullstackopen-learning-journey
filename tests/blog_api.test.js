const mongoose = require ('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require ('../app')
const api = supertest(app)
const Blog = require ('../models/blog')
const User = require ('../models/user')
const bcrypt = require ('bcrypt')

const login = helper.login

beforeEach(async () => {

  await Blog.deleteMany({})

  for (let blog of helper.dummyBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('seecrit', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

test('a user can log in', async () => {

  const user = await api
    .post('/api/login')
    .send(login)
    .expect(200)

  expect(user.body.username).toBe('root')
})

test('a user can create a blog', async () => {

  const user = await api
    .post('/api/login')
    .send(login)
    .expect(200)

  const newBlog = {
    title: 'Jest testing is very easy!',
    author: 'Derek R Sonnenberg',
    url: 'https://pixelpajamastudios.com/jest-testing-is-easy',
    likes: 17,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', 'bearer ' + user.body.token)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.theBlogs()
  const blogTitles = blogsAfter.map(b => b.title)

  expect(blogsAfter).toHaveLength(helper.dummyBlogs.length + 1)
  expect(blogTitles).toContain('Jest testing is very easy!')

})

test('a non-user can not create a blog, response 401', async () => {

  const newBlog = {
    title: 'Jest testing is very easy!',
    author: 'Derek R Sonnenberg',
    url: 'https://pixelpajamastudios.com/jest-testing-is-easy',
    likes: 17,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.theBlogs()
  const blogTitles = blogsAfter.map(b => b.title)

  expect(blogsAfter).toHaveLength(helper.dummyBlogs.length)
  expect(blogTitles).not.toContain('Jest testing is very easy!')

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

test('blog submitted without likes value default to 0 likes', async () => {

  const user = await api
    .post('/api/login')
    .send(login)
    .expect(200)

  const newBlog = {
    title: 'Supertest!',
    author: 'Derek R Sonnenberg',
    url: 'https://pixelpajamastudios.com/10-reasons-for-supertest'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', 'bearer ' + user.body.token)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.theBlogs()
  const blogTitles = blogsAfter.map(b => b.title)
  const theNewBlog = blogsAfter.find(b => b.title === 'Supertest!')

  expect(blogsAfter).toHaveLength(helper.dummyBlogs.length + 1)
  expect(blogTitles).toContain('Supertest!')
  expect(theNewBlog.likes).toBe(0)
})

test('blogs submitted without urls are not added', async () => {


  const user = await api
    .post('/api/login')
    .send(login)
    .expect(200)

  const noUrlBlog = {
    title: 'Space is lovely.',
    author: 'Derek R Sonnenberg',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(noUrlBlog)
    .set('Authorization', 'bearer ' + user.body.token)
    .expect(400)

  const blogsAfter = await helper.theBlogs()
  expect(blogsAfter).toHaveLength(helper.dummyBlogs.length)
})

test('blogs are deleted by ID, respond with 204', async () => {

  const user = await api
    .post('/api/login')
    .send(login)
    .expect(200)

  const newBlog = {
    title: 'Jest testing is very easy!',
    author: 'Derek R Sonnenberg',
    url: 'https://pixelpajamastudios.com/jest-testing-is-easy',
    likes: 17,
  }

  const blog = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', 'bearer ' + user.body.token)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  await api
    .delete(`/api/blogs/${blog.body.id}`)
    .set('Authorization', 'bearer ' + user.body.token)
    .expect(204)

  const blogsAfter = await helper.theBlogs()
  const allBlogId = blogsAfter.map(b => b.id)

  expect(blogsAfter).toHaveLength(helper.dummyBlogs.length)
  expect(allBlogId).not.toContain(blog.body.id)
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
})

describe('when there is one user to begin with', () => {

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