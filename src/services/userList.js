import axios from 'axios'
const baseUrl = '/api/users'

const getUserList = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export default { getUserList }
