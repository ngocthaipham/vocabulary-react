import Level from "./levelApi";
import React, { useState } from "react";

const AddLevelForm = (props) => {
  const [idLevel, setIdLevel] = useState();
  const [level, setLevel] = useState("");
  const [idSource, setIdSource] = useState("");
  const [addState, setAddState] = useState(false);

  const update = () => {
    Level.getLevelTable(props.currentIdCourse).then((response) => {
      props.reRender(response.data);
    });
  };

  const addLevel = () => {
    var data = {
      idLevel: idLevel,
      level: level,
      idSource: idSource,
    };

    Level.addLevel(data).then((response) => {
      alert(response.data);
      setAddState(false);
      update();
    });
  };

  return (
    <>
      {!addState ? (
    <button onClick={()=> {setAddState(true)}}>
          Add a new level
        </button>
      ) : (
        <div>
          <h3>Add level</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addLevel();
            }}
          >
            <label>ID</label>
            <input
              type="number"
              onChange={(e) => {
                setIdLevel(e.target.value);
              }}
            />
            <label>Level</label>
            <input
              type="number"
              onChange={(e) => {
                setLevel(e.target.value);
              }}
            />
            <label>ID Source</label>
            <input
              type="number"
              onChange={(e) => {
                setIdSource(e.target.value);
              }}
            />
            <button type="submit">Add new level</button>
            <button onClick={()=> {setAddState(true)}} type="button">
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default AddLevelForm;
