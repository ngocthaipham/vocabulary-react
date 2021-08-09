import http from "../../http-common";

const addCourse = (data) => {
  return http.post("/sources", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteCourse = (id) => {
  return http.delete(`/sources/${id}`);
};

const get = (userName) => {
  return http.get(`/sources/${userName}`, {
    withCredentials: true,
  });
};

const logout = () => {
  return http.get("http://localhost:5000/logout", { withCredentials: true });
};
const getLevelTable = (id) => {
  return http.get(`/levels/${id}`);
};
const editCourse = (id, data) => {
  return http.put(`/sources/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default { addCourse, deleteCourse, getLevelTable, editCourse, get, logout };
