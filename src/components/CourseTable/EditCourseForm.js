import React, { useState } from "react";
import Course from "./courseApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";
const EditCourseForm = () => {
  const [newIdSource, setNewIdSource] = useState();
  const [newNameSource, setNewNameSource] = useState();
  const [newDesSource, setNewDesSource] = useState();

  const { idSource, nameSource, desSource } = useParams();

  let history = useHistory();

  const updateCourse = (id) => {
    var data = {
      nameSource: newNameSource,
      desSource: newDesSource,
    };
    Course.editCourse(id, data).then((response) => {
      alert(response.data);
      history.push("/");
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
        >
          <label>ID : </label>
          <input
            type="number"
            defaultValue={idSource}
            onChange={(e) => {
              setNewIdSource(e.target.value);
            }}
          />
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
              history.push("/");
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
