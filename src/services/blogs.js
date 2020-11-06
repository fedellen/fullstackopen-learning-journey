import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {

  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const createBlog = async newBlog => {

  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newBlog, config)

  return response.data
}

const likeBlog = async blogObject => {
  const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject)
  return response.data
}

const deleteBlog = async id => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default {
  getAll,
  setToken,
  createBlog,
  likeBlog,
  deleteBlog
}