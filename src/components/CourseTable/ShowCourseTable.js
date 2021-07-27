import React, { useState, useEffect } from "react";
import Axios from "axios";
import Course from "./courseApi";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faPenSquare,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
const ShowCourseTable = (props) => {
  const [coursesList, setCourseList] = useState([]);
  const { userName } = useParams();
  const history = useHistory();

  useEffect(() => {
    Axios.get(`http://localhost:5000/sources/${userName}`, {
      withCredentials: true,
    }).then((response) => {
      setCourseList(response.data);
    });
  }, []);

  const removeCourse = (id) => {
    Course.deleteCourse(id).then((response) => {
      alert("remove success");
      setCourseList(coursesList.filter((course) => course.idSource !== id));
    });
  };

  const showLevel = (id) => {
    props.updateCurrentIdCourse(id);
  };

  const logout = () => {
    Axios.get("http://localhost:5000/logout", { withCredentials: true }).then(
      (response) => {
        alert(response.data);
        history.push("/");
      }
    );
  };

  return (
    <>
      <div>
        <p>{`hi,${userName}`}</p>
        <button onClick={logout}>Logout</button>
      </div>
      <Link to={`/${userName}/addcourse`}>
        <button className="add-btn">
          <span className="text">Add a new course</span>
          <span className="add-icon">
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </button>
      </Link>

      <div>
        <table border="0" cellPadding="0" cellSpacing="0">
          <thead className="header">
            <tr>
              <th>ID</th>
              <th>Name Source</th>
              <th>Description Source</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="content">
            {coursesList.map((course) => (
              <tr key={course.idSource}>
                <td>{course.idSource}</td>
                <td>{course.nameSource}</td>
                <td>{course.desSource}</td>
                <td>
                  <img
                    className="image"
                    src={`http://localhost:5000/images/${course.imageSource}`}
                  ></img>
                </td>
                <td>
                  <Link to={`/${userName}/levels/${course.idSource}`}>
                    <button
                      className="view-btn"
                      onClick={() => {
                        showLevel(course.idSource);
                      }}
                    >
                      <div>
                        View <FontAwesomeIcon icon={faAngleRight} />
                      </div>
                    </button>
                  </Link>
                  <Link
                    to={`/${userName}/editcourse/${course.idSource}/${course.nameSource}/${course.desSource}`}
                  >
                    <button className="edit-btn">
                      <div>
                        Edit <FontAwesomeIcon icon={faPenSquare} />
                        <div className="circle"></div>
                      </div>
                    </button>
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      removeCourse(course.idSource);
                    }}
                  >
                    <span className="text">
                      Delete
                      <span className="trash-icon">
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
