import React, { useState } from "react";
import Course from "./courseApi";

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
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateCourse(props.currentIdCourse);
              props.renderEdit(false);
            }}
          >
            <label>ID</label>
            <input
              type="number"
              value={props.currentIdCourse}
              onChange={(e) => {
                setIdSource(e.target.value);
              }}
            />
            <label>New Name Source</label>
            <input
              type="text"
              defaultValue={props.currentCourse.nameSource}
              onChange={(e) => {
                setNewNameSource(e.target.value);
              }}
            />
            <label>New Description Source</label>
            <input
              type="text"
              defaultValue={props.currentCourse.desSource}
              onChange={(e) => {
                setNewDesSource(e.target.value);
              }}
            />
            <button type="submit">Save</button>
            <button onClick={cancel} type="button">
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditCourseForm;
