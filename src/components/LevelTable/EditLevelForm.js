import Level from "./levelApi";
import React, { useState } from "react";

const EditLevelForm = (props) => {
    const [idLevel, setIdLevel] = useState();
    const [level, setLevel] = useState("");
    const [idSource, setIdSource] = useState("");

    const update = () => {
        Level.get()
        .then(response => {
            props.render(response.data)
        })
      }

    const updateLevel = (id) => {
        var data = {
            level: level,
            idSource: idSource
        }

        Level.editLevel(id, data)
        .then(response=> {
            alert(response.data)
            update()
        })
    }

    function cancel () {
      props.setEditState(false)
      props.setCurrentIdLevel(0)
    }

    return (
    <>
    {!props.editState ? (
        <p></p>
    ) : (
      <div id="update-level-form" >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateLevel(props.currentIdLevel)
            props.setEditState(false)
          }}
        >
          <label>ID</label>
          <input
            type="number"
            id="id-level-input"
            value={props.currentLevel.idLevel}
            onChange={(e) => {
              setIdLevel(e.target.value);
            }}
          />
          <label>New Level</label>
          <input
            type="number"
            id="level"
            value={props.currentLevel.level}

            onChange={(e) => {
              setLevel(e.target.value);
            }}
          />
          <label>New ID Source</label>
          <input
            type="number"
            name="id-source"
            value={props.currentLevel.idSource}
            onChange={(e) => {
              setIdSource(e.target.value);
            }}
          />
          <button
            type="submit"
          >
            Save
          </button>
          <button
            type="button"
            onClick={cancel}
          >
            Cancel
          </button>
        </form>
      </div>
    )}
    </>
  );
};
export default EditLevelForm;