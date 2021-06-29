import http from "../../http-common";



const addCourse = data => {
 return http.post('/sources', data)
}

const deleteCourse = id => {
  return http.delete(`/sources/${id}`)
}

const get = () => {
  return http.get('/sources')
}

const getLevelTable = (id) => {
  return http.get(`/levels/${id}`)
}
const editCourse = (id, data)=> {
  return http.put(`/sources/${id}`,data)
}


export default { addCourse, deleteCourse, getLevelTable, editCourse, get };
