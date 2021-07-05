import React, { useState } from "react";
import Word from "./wordApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";

const EditWordForm = (props) => {
  const [newId, setNewId] = useState();
  const [newIdLevel, setNewIdLevel] = useState();
  const [newVocab, setNewVocab] = useState("");
  const [newMeaning, setNewMeaning] = useState("");

  const { id, idLevel, vocab, meaning } = useParams();

  let history = useHistory();

  const updateWord = (id) => {
    var data = {
      idLevel: newIdLevel,
      vocab: newVocab,
      meaning: newMeaning,
    };

    Word.editWord(id, data).then((response) => {
      alert(response.data);
      history.push(`/words/${props.currentIdLevel}`);
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
        >
          <label>ID : </label>
          <input
            type="number"
            defaultValue={id}
            onChange={(e) => {
              setNewId(e.target.value);
            }}
          />
          <label>ID Level : </label>
          <input
            type="number"
            defaultValue={idLevel}
            onChange={(e) => {
              setNewIdLevel(e.target.value);
            }}
          />
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
              history.push(`/words/${props.currentIdLevel}`);
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
