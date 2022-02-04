import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
    return axios.get(baseUrl).then(res => res.data);
}

const create = (newPerObj) =>{
    return axios.post(baseUrl,newPerObj)
                .then(res => res.data)
}

const update = (newPerObj, id) =>{
  return axios.put(`${baseUrl}/${id}`, newPerObj)
              .then(res => res.data)
}

const deleteEntry = id =>{
    return axios.delete(`${baseUrl}/${id}`)
                .then(res=> res.data)
}

export default {getAll, create, deleteEntry, update};