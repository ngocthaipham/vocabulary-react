import Level from "./levelApi";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";

const EditLevelForm = () => {
  const [newLevel, setNewLevel] = useState("");
  const [newFileSelected, setNewFileSelected] = useState();
  const { userName, idSource, idLevel, level } = useParams();

  let history = useHistory();

  const updateLevel = (id) => {
    var data = new FormData();
    data.append("level", newLevel);
    data.append("idSource", idSource);
    data.append("imageLevel", newFileSelected);

    Level.editLevel(id, data).then((response) => {
      alert(response.data);
      history.push(`/${userName}/levels/${idSource}`);
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
          encType="multipart/form-data"
        >
          <label>New Level : </label>
          <input
            type="number"
            defaultValue={level}
            onChange={(e) => {
              setNewLevel(e.target.value);
            }}
          />
          <label for="imageLevel">Select a file</label>
          <input
            type="file"
            name="imageLevel"
            onChange={(e) => {
              setNewFileSelected(e.target.files[0]);
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
              history.push(`/${userName}/levels/${idSource}`);
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
