import http from "../../http-common";

const addLevel = (data) => {
  return http.post("/levels", data);
};

const deleteLevel = (id) => {
  return http.delete(`/levels/${id}`);
};

const get = () => {
  return http.get("/levels");
};

const getLevelTable = (id) => {
  return http.get(`/levels/${id}`);
};

const getWordTable = (id) => {
  return http.get(`/words/${id}`);
};

const editLevel = (id, data) => {
  return http.put(`/levels/${id}`, data);
};

export default {
  addLevel,
  deleteLevel,
  getLevelTable,
  getWordTable,
  editLevel,
  get,
};
