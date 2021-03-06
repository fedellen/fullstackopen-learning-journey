import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(url)
  return res.data
}

const createNew = async content => {
  const anecdote = { content, votes: 0 }
  const res = await axios.post(url, anecdote)
  return res.data
}

const voteFor = async (anecdote) => {
  const res = await axios.put(`${url}/${anecdote.id}`, anecdote)
  return res.data
}

export default { getAll, createNew, voteFor }