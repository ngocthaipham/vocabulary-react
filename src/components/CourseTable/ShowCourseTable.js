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
  const [currentCourse, setCurrentCourse] = useState({});
  const [levelsList, setLevelsList] = useState([]);
  const [levelState, setLevelState] = useState(false);
  const [currentId, setCurrentId] = useState();

  useEffect(() => {
    Axios.get("http://localhost:5000/sources").then((response) => {
      setCourseList(response.data);
    });
  }, []);

  const render = (response) => {
    setCourseList(response);
  };
  const renderLevelList = (res) => {
    setLevelsList(res)
  }
  const showEditForm = (id) => {
    for( let i = 0; i< coursesList.length ; i++) {
      if(id === coursesList[i].idSource) {
        setCurrentCourse(coursesList[i])
      }
    }
    setEditState(true);
    setCurrentId(id)
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

  const showLevel = (id) => {
    setCurrentCourse(coursesList[id-1])
    setLevelState(true);
    setCurrentId(id)
    console.log(coursesList);
    Course.getLevelTable(id).then((response) => {
      setLevelsList(response.data);
      // console.log(id);
    });
  };

  function highlight(id) {
    if (id === currentId) {
      return {
        backgroundColor: "pink",
      };
    }
    return {
      backgroundColor: "white",
    };
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
        currentId={currentId}
        render={render}
        currentCourse={currentCourse}
        setCurrentId={setCurrentId}
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
              <tr key={course.idSource} style={highlight(course.idSource)}>
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
          idSource={idSource}
          levelState={levelState}
          setLevelState={setLevelState}
          levelsList={levelsList}
          renderLevelList={renderLevelList}
          setCurrentId={setCurrentId}
        />
      </div>
    </>
  );
};
export default ShowCourseTable;
