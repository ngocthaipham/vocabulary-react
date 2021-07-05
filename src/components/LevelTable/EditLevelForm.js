import Level from "./levelApi";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";

const EditLevelForm = (props) => {
  const [newIdLevel, setNewIdLevel] = useState();
  const [newLevel, setNewLevel] = useState("");
  const [newIdSource, setNewIdSource] = useState("");

  const { idLevel, level, idSource } = useParams();

  let history = useHistory();

  const updateLevel = (id) => {
    var data = {
      level: newLevel,
      idSource: newIdSource,
    };

    Level.editLevel(id, data).then((response) => {
      alert(response.data);
      history.push(`/levels/${props.currentIdCourse}`);
    });
  };

  return (
    <>
      <div className="edit-form">
        <h3>Edit Level</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateLevel(idLevel);
          }}
        >
          <label>ID : </label>
          <input
            type="number"
            defaultValue={idLevel}
            onChange={(e) => {
              setNewIdLevel(e.target.value);
            }}
          />
          <label>New Level : </label>
          <input
            type="number"
            defaultValue={level}
            onChange={(e) => {
              setNewLevel(e.target.value);
            }}
          />
          <label>New ID Source : </label>
          <input
            type="number"
            defaultValue={idSource}
            onChange={(e) => {
              setNewIdSource(e.target.value);
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
          <button
            className="cancel-btn"
            type="button"
            onClick={() => {
              history.push(`/levels/${props.currentIdCourse}`);
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
    </>
  );
};
export default EditLevelForm;
