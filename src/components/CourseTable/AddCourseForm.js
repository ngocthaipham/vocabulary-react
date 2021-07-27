import React, { useState } from "react";
import Course from "./courseApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";
const AddCourseForm = () => {
  const [nameSource, setNameSource] = useState("");
  const [desSource, setDesSource] = useState("");
  const [fileSelected, setFileSelected] = useState();

  let history = useHistory();
  const { userName } = useParams();
  const addCourse = () => {
    var data = new FormData();
    data.append("nameSource", nameSource);
    data.append("desSource", desSource);
    data.append("userName", userName);
    data.append("imageSource", fileSelected);
    Course.addCourse(data).then((response) => {
      alert(response.data);
      history.push(`/${userName}`);
    });
  };

  return (
    <>
      <div>
        <div>
          <h3>Add course</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addCourse();
            }}
            encType="multipart/form-data"
          >
            <label>Name Source : </label>
            <input
              type="text"
              onChange={(e) => {
                setNameSource(e.target.value);
              }}
            />
            <label>Description Source : </label>
            <input
              type="text"
              onChange={(e) => {
                setDesSource(e.target.value);
              }}
            />
            <label for="image">Select a file</label>
            <input
              type="file"
              name="image"
              onChange={(e) => {
                setFileSelected(e.target.files[0]);
              }}
            />
            <button className="submit-btn" type="submit">
              <span className="text">
                Add
                <span className="submit-icon">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </span>
            </button>
            <button
              className="cancel-btn"
              onClick={() => {
                history.push(`/${userName}`);
              }}
            >
              <span className="text">
                Cancel
                <span className="cancel-icon">
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCourseForm;
