import React, { useState } from "react";
import Course from "./courseApi";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";
const EditCourseForm = () => {
  const [newNameSource, setNewNameSource] = useState();
  const [newDesSource, setNewDesSource] = useState();
  const [newFileSelected, setNewFileSelected] = useState();
  const { idSource, nameSource, desSource, userName } = useParams();

  let history = useHistory();

  const updateCourse = (id) => {
    var data = new FormData();
    data.append("nameSource", newNameSource);
    data.append("desSource", newDesSource);
    data.append("imageSource", newFileSelected);
    Course.editCourse(id, data).then((response) => {
      alert(response.data);
      history.push(`/${userName}`);
    });
  };

  return (
    <div>
      <div className="edit-form">
        <h3>Edit Course</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateCourse(idSource);
          }}
          encType="multipart/form-data"
        >
          <label>New Name Course : </label>
          <input
            type="text"
            defaultValue={nameSource}
            onChange={(e) => {
              setNewNameSource(e.target.value);
            }}
          />
          <label>New Description Course : </label>
          <input
            type="text"
            defaultValue={desSource}
            onChange={(e) => {
              setNewDesSource(e.target.value);
            }}
          />
          <label for="image">Select a file</label>
          <input
            type="file"
            name="image"
            onChange={(e) => {
              setNewFileSelected(e.target.files[0]);
            }}
          />
          <button className="submit-btn" type="submit">
            <span className="text">
              Save
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
            type="button"
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
  );
};

export default EditCourseForm;
