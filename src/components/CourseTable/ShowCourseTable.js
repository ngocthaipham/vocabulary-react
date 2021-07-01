import React, { useState, useEffect } from "react";
import Axios from "axios";
import Course from "./courseApi";
import AddCourseForm from "./AddCourseForm";
import EditCourseForm from "./EditCourseForm";
const ShowCourseTable = (props) => {
  const [coursesList, setCourseList] = useState([]);
  const [isShowEditForm, setIsShowEditForm] = useState(false);
  const [currentCourse, setCurrentCourse] = useState({});


  useEffect(() => {
    Axios.get("http://localhost:5000/sources").then((response) => {
      setCourseList(response.data);
    });
  }, []);

  const reRender = (response) => {
    setCourseList(response);
  };
  const renderLevelList = (res) => {
    props.updateLevelList(res)
  };

  const renderEdit = (res) => {
    setIsShowEditForm(res)
  }

  const setId = (res) => {
    props.updateCurrentIdCourse(res)
  }
  const showEditForm = (id) => {
    for (let i = 0; i < coursesList.length; i++) {
      if (id === coursesList[i].idSource) {
        setCurrentCourse(coursesList[i]);
      }
    }
    setIsShowEditForm(true);
    props.updateCurrentIdCourse(id);
  };

  const removeCourse = (id) => {
    Course.deleteCourse(id).then((response) => {
      alert("remove success");
      setCourseList(coursesList.filter((course) => course.idSource !== id));
    });
  };

  function disableButton() {
    if (!isShowEditForm) {
      return false;
    } else {
      return true;
    }
  }

  const showLevel = (id) => {
    props.showLevelList(true)
    props.updateCurrentIdCourse(id);
    Course.getLevelTable(id).then((response) => {
      renderLevelList(response.data)
    });
  };

  function highlight(id) {
    if (id === props.currentIdCourse) {
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
        reRender={reRender}
      />
      <EditCourseForm
        isShowEditForm={isShowEditForm}
        renderEdit={renderEdit}
        currentIdCourse={props.currentIdCourse}
        reRender={reRender}
        currentCourse={currentCourse}
        setId={setId}
      />
      <div>
        <table border="5" cellPadding="5">
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
                <td>{course.idSource}</td>
                <td>{course.nameSource}</td>
                <td>{course.desSource}</td>
                <td>
                  <button
                    disabled={disableButton()}
                    onClick={() => {
                      showLevel(course.idSource);
                    }}
                  >
                    View
                  </button>
                  <button
                    disabled={disableButton()}
                    onClick={() => {
                      showEditForm(course.idSource);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    disabled={disableButton()}
                    onClick={() => {
                      removeCourse(course.idSource);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ShowCourseTable;
