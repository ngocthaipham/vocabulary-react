import Level from "./levelApi";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const AddLevelForm = (props) => {
  const [idLevel, setIdLevel] = useState();
  const [level, setLevel] = useState("");
  const [idSource, setIdSource] = useState("");

  let history = useHistory();

  const addLevel = () => {
    var data = {
      idLevel: idLevel,
      level: level,
      idSource: idSource,
    };

    Level.addLevel(data).then((response) => {
      alert(response.data);
      history.push(`/levels/${props.currentIdCourse}`);
    });
  };

  return (
    <>
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
              history.push(`/levels/${props.currentIdCourse}`);
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
    </>
  );
};
export default AddLevelForm;
