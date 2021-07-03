import Level from "./levelApi";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

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
        <button
          className="add-btn"
          onClick={() => {
            setAddState(true);
          }}
        >
          <span className="text">
            Add a new level
            <span className="add-icon">
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </span>
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
            <label>ID : </label>
            <input
              type="number"
              onChange={(e) => {
                setIdLevel(e.target.value);
              }}
            />
            <label>Level : </label>
            <input
              type="number"
              onChange={(e) => {
                setLevel(e.target.value);
              }}
            />
            <label>ID Source : </label>
            <input
              type="number"
              onChange={(e) => {
                setIdSource(e.target.value);
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
                setAddState(false);
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
      )}
    </>
  );
};
export default AddLevelForm;
