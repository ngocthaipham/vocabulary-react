import http from "../../http-common";

const addWord = (data) => {
  return http.post("/words", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteWord = (id) => {
  return http.delete(`/words/${id}`);
};

const get = () => {
  return http.get("/words");
};

const getWordTable = (id) => {
  return http.get(`/words/${id}`);
};

const editWord = (id, data) => {
  return http.put(`/words/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default { addWord, deleteWord, getWordTable, editWord, get };
