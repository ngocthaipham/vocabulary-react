import React, { useState } from "react";
import Course from "./courseApi";

const EditCourseForm = (props) => {

  const [idSource, setIdSource] = useState();
  const [nameSource, setNameSource] = useState("");
  const [desSource, setDesSource] = useState("");

const update = () => {
        Course.get()
        .then(response => {
            props.render(response.data)
        })
      }

  const updateCourse = (id) => {
    var data = {
        // idSource: idSource,
        nameSource: nameSource,
        desSource: desSource,
      };
    Course.editCourse(id, data,{
    }).then((response) => {
      alert(response.data);
      update();
    });
  };

function cancel () {
  props.setEditState(false)
  props.setCurrentId(0)
}
  return (
    <div id="update-course-form">
      {!props.editState ? (
       <p></p>
      ) : (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateCourse(props.currentId)
              props.setEditState(false)
            }}
          >
            <label>ID</label>
            <input
              type="number"
              id="id-input"
              value={props.currentId}
              onChange={(e) => {
                setIdSource(e.target.value)
              }}
            />
            <label>New Name Source</label>
            <input
              type="text"
              id="new-name-source"
              value={props.currentCourse.nameSource}
              onChange={(e) => {
                setNameSource(e.target.value)
              }}
            />
            <label>New Description Source</label>
            <input
              type="text"
              name="new-des-source"
              value={props.currentCourse.desSource}
              onChange={(e) => {
                setDesSource(e.target.value)
              }}
            />
            <button type="submit">Save</button>
            <button onClick={cancel}
             type="button">Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditCourseForm;
