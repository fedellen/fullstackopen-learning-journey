import axios from 'axios'
const location = '/api/persons'

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

const updatePeople = ( id, newObject ) => {
    const request = axios.put(`${location}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { 
    getPeople, 
    addPeople, 
    deletePeople, 
    updatePeople 
}