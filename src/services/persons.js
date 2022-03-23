import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

// get all people from server (GET)
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// add new person (POST)
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}
// replace existing person (PUT)
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}
// remove person with this ID 
const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {getAll, create, update, remove}