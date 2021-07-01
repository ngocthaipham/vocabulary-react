import Level from "./levelApi";
import React, { useState } from "react";

const EditLevelForm = (props) => {
  const [idLevel, setIdLevel] = useState();
  const [newLevel, setNewLevel] = useState("");
  const [newIdSource, setNewIdSource] = useState("");

  const update = () => {
    Level.getLevelTable(props.currentIdCourse).then((response) => {
      props.reRender(response.data);
    });
  };

  const updateLevel = (id) => {
    var data = {
      level: newLevel,
      idSource: newIdSource,
    };

    Level.editLevel(id, data).then((response) => {
      alert(response.data);
      update();
    });
  };

  function cancel() {
    props.updateEditForm(false);
    props.setId(0);
  }

  return (
    <>
      {!props.isShowEditForm ? (
        <p></p>
      ) : (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateLevel(props.currentIdLevel);
              props.updateEditForm(false);
            }}
          >
            <label>ID</label>
            <input
              type="number"
              defaultValue={props.currentIdLevel}
              onChange={(e) => {
                setIdLevel(e.target.value);
              }}
            />
            <label>New Level</label>
            <input
              type="number"
              defaultValue={props.currentLevel.level}
              onChange={(e) => {
                setNewLevel(e.target.value);
              }}
            />
            <label>New ID Source</label>
            <input
              type="number"
              defaultValue={props.currentLevel.idSource}
              onChange={(e) => {
                setNewIdSource(e.target.value);
              }}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={cancel}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default EditLevelForm;
