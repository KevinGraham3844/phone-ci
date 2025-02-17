import axios from 'axios'
const baseUrl = '/api/people/'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = idToDelete => {
    return axios.delete(`${baseUrl}${idToDelete}`)
}

const updatePerson = (id, newPerson) => {
    const request = axios.put(`${baseUrl}${id}`, newPerson)
    return request.then(response => response.data)
}

export default { getAll, create, deletePerson, updatePerson }