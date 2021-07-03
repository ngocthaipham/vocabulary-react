import React, { useState } from "react";
import Course from "./courseApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
const EditCourseForm = (props) => {
  const [idSource, setIdSource] = useState();
  const [newNameSource, setNewNameSource] = useState();
  const [newDesSource, setNewDesSource] = useState();

  const update = () => {
    Course.get().then((response) => {
      props.reRender(response.data);
    });
  };

  const updateCourse = (id) => {
    var data = {
      nameSource: newNameSource,
      desSource: newDesSource,
    };
    Course.editCourse(id, data).then((response) => {
      alert(response.data);
      update();
    });
  };

  function cancel() {
    props.renderEdit(false);
    props.setId(0);
  }

  return (
    <div>
      {!props.isShowEditForm ? (
        <p></p>
      ) : (
        <div className="edit-form">
          <h3>Edit Course</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateCourse(props.currentIdCourse);
              props.renderEdit(false);
            }}
          >
            <label>ID : </label>
            <input
              type="number"
              value={props.currentIdCourse}
              onChange={(e) => {
                setIdSource(e.target.value);
              }}
            />
            <label>New Name Course : </label>
            <input
              type="text"
              defaultValue={props.currentCourse.nameSource}
              onChange={(e) => {
                setNewNameSource(e.target.value);
              }}
            />
            <label>New Description Course : </label>
            <input
              type="text"
              defaultValue={props.currentCourse.desSource}
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
            <button className="cancel-btn"
            onClick={cancel} type="button">
            <span className="text">
                          Cancel
                          <span className="cancel-icon">
                            <FontAwesomeIcon icon={faTimes} />
                          </span>
                        </span>
            </button>
          </form>
        </div>
      )
    }
    </div>
  );
};

export default EditCourseForm;
