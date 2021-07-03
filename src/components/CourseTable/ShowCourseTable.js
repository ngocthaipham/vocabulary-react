import React, { useState, useEffect } from "react";
import Axios from "axios";
import Course from "./courseApi";
import AddCourseForm from "./AddCourseForm";
import EditCourseForm from "./EditCourseForm";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faPenSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
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
    props.updateLevelList(res);
  };

  const renderEdit = (res) => {
    setIsShowEditForm(res);
  };

  const setId = (res) => {
    props.updateCurrentIdCourse(res);
  };
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
    props.showLevelList(true);
    props.updateCurrentIdCourse(id);
    Course.getLevelTable(id).then((response) => {
      renderLevelList(response.data);
    });
  };

  function highlight(id) {
    if (id === props.currentIdCourse) {
      return {
        backgroundColor: "rgba(126, 228, 214, 0.3)",
      };
    }
    return {
      backgroundColor: "",
    };
  }

  return (
    <>
      {/* <Switch>
        <Route exact path="/addcourse"> */}
          <AddCourseForm reRender={reRender} />
        {/* </Route>
        <Route exact path="/editcourse/:id"> */}
          <EditCourseForm
            isShowEditForm={isShowEditForm}
            renderEdit={renderEdit}
            currentIdCourse={props.currentIdCourse}
            reRender={reRender}
            currentCourse={currentCourse}
            setId={setId}
          />
        {/* </Route>
      </Switch> */}
      <div>
        <table border="0" cellPadding="0" cellSpacing="0">
          <thead className="header">
            <tr>
              <th>ID</th>
              <th>Name Source</th>
              <th>Description Source</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="content">
            {coursesList.map((course) => (
              <tr key={course.idSource} style={highlight(course.idSource)}>
                <td>{course.idSource}</td>
                <td>{course.nameSource}</td>
                <td>{course.desSource}</td>
                <td>
                  <Link to={`/levels/${course.idSource}`}>
                    <button
                      className="view-btn"
                      disabled={disableButton()}
                      onClick={() => {
                        showLevel(course.idSource);
                      }}
                    >
                      <div>
                        View <FontAwesomeIcon icon={faAngleRight} />
                      </div>
                    </button>
                  </Link>
                  {/* <Link to={`/editcourse/${course.idSource}`}> */}
                    <button
                      className="edit-btn"
                      disabled={disableButton()}
                      onClick={() => {
                        showEditForm(course.idSource);
                      }}
                    >
                      <div>
                        Edit <FontAwesomeIcon icon={faPenSquare} />
                        <div className="circle"></div>
                      </div>
                    </button>
                  {/* </Link> */}
                  <button
                    className="delete-btn"
                    disabled={disableButton()}
                    onClick={() => {
                      removeCourse(course.idSource);
                    }}
                  >
                    <span className='text'>
                      Delete<span className="trash-icon">
                        <FontAwesomeIcon icon={faTrash} />
                      </span>
                    </span>
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
