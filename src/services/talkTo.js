import axios from 'axios'
const location = 'http://localhost:3001/persons'

const getPeople = () => {
    const request = axios.get(location)
    return request.then(response => response.data)
}

const addPeople = newObject => {
    const request = axios.post(location, newObject)
    return request.then(response => response.data)
}

const deletePeople = id => {
    const request = axios.delete(`${location}/${id}`)
    return request.then(response => response)
}

export default { getPeople, addPeople, deletePeople }