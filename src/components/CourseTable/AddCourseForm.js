import React, { useState } from "react";
import Course from "./courseApi";

const AddCourseForm = (props) => {
  const [idSource, setIdSource] = useState();
  const [nameSource, setNameSource] = useState("");
  const [desSource, setDesSource] = useState("");
  const [addState, setAddState] = useState(false);

  const update = () => {
    Course.get().then((response) => {
      props.reRender(response.data);
    });
  };

  const addCourse = () => {
    var data = {
      idSource: idSource,
      nameSource: nameSource,
      desSource: desSource,
    };
    Course.addCourse(data).then((response) => {
      alert(response.data);
      setAddState(false);
      update();
    });
  };

  return (
    <div>
      {!addState ? (
        <button
          onClick={() => {
            setAddState(true);
          }}
        >
          Add a new course
        </button>
      ) : (
        <div>
          <h3>Add course</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addCourse();
            }}
          >
            <label>ID</label>
            <input
              type="number"
              onChange={(e) => {
                setIdSource(e.target.value);
              }}
            />
            <label>Name Source</label>
            <input
              type="text"
              onChange={(e) => {
                setNameSource(e.target.value);
              }}
            />
            <label>Description Source</label>
            <input
              type="text"
              onChange={(e) => {
                setDesSource(e.target.value);
              }}
            />
            <button type="submit">Add new book</button>
            <button
              onClick={() => {
                setAddState(false);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddCourseForm;
