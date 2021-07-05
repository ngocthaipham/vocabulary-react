import React, { useState } from "react";
import Course from "./courseApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
const AddCourseForm = () => {
  const [idSource, setIdSource] = useState();
  const [nameSource, setNameSource] = useState("");
  const [desSource, setDesSource] = useState("");
  let history = useHistory();

  const addCourse = () => {
    var data = {
      idSource: idSource,
      nameSource: nameSource,
      desSource: desSource,
    };
    Course.addCourse(data).then((response) => {
      alert(response.data);
      history.push("/");
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
          >
            <label>ID : </label>
            <input
              type="number"
              onChange={(e) => {
                setIdSource(e.target.value);
              }}
            />
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
                history.push("/");
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
