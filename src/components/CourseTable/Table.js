import React, { useState, useEffect } from "react";
import Axios from "axios";
import ShowCourseTable from "./ShowCourseTable";
import AddCourseForm from "./AddCourseForm";
import EditCourseForm from "./EditCourseForm";

const Table = (props) => {
  const [coursesList, setCoursesList] = useState([]);
  const [levelsList, setLevelsList] = useState([]);
  const [idSource, setIdSource] = useState();
  const [nameSource, setNameSource] = useState("");
  const [desSource, setDesSource] = useState("");

  

  // //source table
  // const submit = () => {
  //   Axios.post("http://localhost:5000/sources", {
  //     idSource: idSource,
  //     nameSource: nameSource,
  //     desSource: desSource,
  //   }).then((response) => {
  //     alert("add success");
  //     ShowCourseTable();
  //   });
  // };

  // const view = (id) => {
  //   Axios.get(`http://localhost:5000/levels/${id}`).then((response) => {
  //     setLevelsList(response.data);
  //   });
  // };

  // const editSources = (id) => {
  //   Axios.put(`http://localhost:5000/sources/${id}`, {
  //     idSource: idSource,
  //     nameSource: nameSource,
  //     desSource: desSource,
  //   }).then((response) => {
  //     alert("updated success");
  //     console.log({ ...sourcesList });
  //     setSourcesList({ ...sourcesList });
  //   });
  // };

  // const deleteSource = (id) => {
  //   console.log(id);
  //   Axios.delete(`http://localhost:5000/sources/${id}`).then(() => {
  //     alert("deleted");
  //     setSourcesList(sourcesList.filter((source) => source.id !== id));
  //   });
  // };

  // function myFunction(id) {}

  // function style(id) {
  //   if (id === 1) {
  //     return { backgroundColor: "red" };
  //   }
  //   return { backgroundColor: "blue" };
  // }

  // function renderForm () {
  //   if (isViewForm == true) {
  //     return (
  //       <div>form</div>
  //     )
  //   }
  // }

  return (
    <>
      <EditCourseForm />
      <ShowCourseTable />
    </>
  );
};

export default Table;
