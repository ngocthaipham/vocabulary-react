import React, { useState, useEffect } from "react";
import Course from "./courseApi";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import AddButton from "../Button/AddButton";
import ViewButton from "../Button/ViewButton";
import EditButton from "../Button/EditButton";
import DeleteButton from "../Button/DeleteButton";

const ShowCourseTable = () => {
  const [coursesList, setCourseList] = useState([]);
  const { userName } = useParams();
  const history = useHistory();

  useEffect(() => {
    Course.get(userName).then((response) => {
      setCourseList(response.data);
    });
  }, []);

  const removeCourse = (id) => {
    Course.deleteCourse(id).then(() => {
      alert("remove success");
      setCourseList(coursesList.filter((course) => course.idSource !== id));
    });
  };

  const logout = () => {
    Course.logout().then((response) => {
      alert(response.data);
      history.push("/");
    });
  };

  return (
    <>
      <h1>English Course</h1>
      <Link to={`/${userName}/addcourse`}>
        <AddButton text={"Add a new course"} />
      </Link>

      <div>
        <table border="0" cellPadding="0" cellSpacing="0">
          <thead className="header">
            <tr>
              <th>Name Source</th>
              <th>Description Source</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="content">
            {coursesList.map((course) => (
              <tr key={course.idSource}>
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
                    <ViewButton />
                  </Link>
                  <Link
                    to={`/${userName}/editcourse/${course.idSource}/${course.nameSource}/${course.desSource}/${course.imageSource}`}
                  >
                    <EditButton />
                  </Link>
                  <DeleteButton remove={removeCourse} id={course.idSource} />
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
