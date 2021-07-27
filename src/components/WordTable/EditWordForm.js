import React, { useState } from "react";
import Word from "./wordApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";

const EditWordForm = () => {
  const [newVocab, setNewVocab] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [newFileSelected, setNewFileSelected] = useState();
  const [newAudioSelected, setNewAudioSelected] = useState();

  const { userName, idSource, idLevel, id, vocab, meaning } = useParams();

  let history = useHistory();

  const updateWord = (id) => {
    var data = new FormData();
    data.append("idLevel", idLevel);
    data.append("vocab", newVocab);
    data.append("meaning", newMeaning);
    data.append("imageWord", newFileSelected);
    data.append("audioWord", newAudioSelected);
    Word.editWord(id, data).then((response) => {
      alert(response.data);
      history.push(`/${userName}/level/${idSource}/words/${idLevel}`);
    });
  };

  return (
    <>
      <div className="edit-form">
        <h3>Edit Word</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateWord(id);
          }}
          encType="multipart/form-data"
        >
          <label>Word : </label>
          <input
            type="text"
            defaultValue={vocab}
            onChange={(e) => {
              setNewVocab(e.target.value);
            }}
          />
          <label>Meaning : </label>
          <input
            type="text"
            defaultValue={meaning}
            onChange={(e) => {
              setNewMeaning(e.target.value);
            }}
          />
          <label for="imageWord">Select a file</label>
          <input
            type="file"
            name="imageWord"
            onChange={(e) => {
              setNewFileSelected(e.target.files[0]);
            }}
          />
          <label for="audioWord">Select a audio</label>
          <input
            type="file"
            name="audioWord"
            onChange={(e) => {
              setNewAudioSelected(e.target.files[0]);
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
            onClick={() => {
              history.push(`/${userName}/level/${idSource}/words/${idLevel}`);
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
export default EditWordForm;
