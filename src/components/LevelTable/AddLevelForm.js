import Level from "./levelApi";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";

const AddLevelForm = () => {
  const [level, setLevel] = useState("");
  const [fileSelected, setFileSelected] = useState();

  const { userName, idSource } = useParams();

  let history = useHistory();

  const addLevel = () => {
    var data = new FormData();
    data.append("level", level);
    data.append("idSource", idSource);
    data.append("imageLevel", fileSelected);
    Level.addLevel(data).then((response) => {
      alert(response.data);
      history.push(`/${userName}/levels/${idSource}`);
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
          encType="multipart/form-data"
        >
          <label>Level : </label>
          <input
            type="number"
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          />
          <label for="imageLevel">Select a file</label>
          <input
            type="file"
            name="imageLevel"
            onChange={(e) => {
              setFileSelected(e.target.files[0]);
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
              history.push(`/${userName}/levels/${idSource}`);
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
