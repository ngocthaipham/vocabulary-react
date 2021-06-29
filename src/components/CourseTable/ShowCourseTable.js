import React, { useState, useEffect } from "react";
import Axios from "axios";
import Course from "./courseApi";
import AddCourseForm from "./AddCourseForm";
import EditCourseForm from "./EditCourseForm";
import ShowLevelTable from "../LevelTable/ShowLevelTable";
const ShowCourseTable = () => {
  const [coursesList, setCourseList] = useState([]);
  const [idSource, setIdSource] = useState();
  const [nameSource, setNameSource] = useState("");
  const [desSource, setDesSource] = useState("");
  const [editState, setEditState] = useState(false);
  const [currentCourse, setCurrentCourse] = useState();
  const [levelsList, setLevelsList] = useState([]);
  const [levelState, setLevelState] = useState(false);
  const [currentIdCourse, setCurrentIdCourse] = useState(1);
  const [array, setArray] = useState([])

  useEffect(() => {
    Axios.get("http://localhost:5000/sources").then((response) => {
      setCourseList(response.data);
    });
  }, []);

  const render = (response) => {
    setCourseList(response);
  };

  const showEditForm = (id) => {
    setCurrentCourse(coursesList[id - 1]);
    console.log(currentIdCourse);
    setEditState(true);
  };

  const removeCourses = (id) => {
    Course.deleteCourse(id).then((response) => {
      alert("remove success");
      setCourseList(coursesList.filter((course) => course.idSource !== id));
    });
  };

  function disableTable() {
    if (!editState) {
      return false;
    } else {
      return true;
    }
  }

  function highlight(id) {
    for (let i = 0; i < coursesList.length; i++) {
      if (id === coursesList[i].idSource) {
        return {
          backgroundColor: "gray",
        };
      }
    }
    return { backgroundColor: "pink" };
  }

  const showLevel = (id) => {
    setCurrentIdCourse(id);
    setLevelState(true);
    console.log(levelState);
    console.log(currentIdCourse);
    Course.getLevelTable(id)
    .then(response=>{
      setArray(response.data)
      console.log(array)
    })
  }

  return (
    <>
      <AddCourseForm
        coursesList={coursesList}
        setCourseList={setCourseList}
        render={render}
      />
      <EditCourseForm
        editState={editState}
        setEditState={setEditState}
        idSource={idSource}
        nameSource={nameSource}
        desSource={desSource}
        coursesList={coursesList}
        currentCourse={currentCourse}
        setCurrentCourse={setCurrentCourse}
        render={render}
      />
      <div>
        <table id="course-table" border="5" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name Source</th>
              <th>Description Source</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coursesList.map((course) => (
              <tr key={course.idSource} style={highlight()}>
                <td id="id-source">{course.idSource}</td>
                <td id="name-source">{course.nameSource}</td>
                <td id="des-source">{course.desSource}</td>
                <td>
                  <button
                    disabled={disableTable()}
                    className="view-btn"
                    onClick={() => {
                      showLevel(course.idSource);
                    }}
                  >
                    View
                  </button>
                  <button
                    disabled={disableTable()}
                    onClick={() => {
                      showEditForm(course.idSource);
                    }}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    disabled={disableTable()}
                    onClick={() => {
                      removeCourses(course.idSource);
                    }}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ShowLevelTable
          array={array}
          currentIdCourse={currentIdCourse}
          idSource={idSource}
          levelState={levelState}
          setLevelState={setLevelState}
        />
      </div>
    </>
  );
};
export default ShowCourseTable;
