import React, { useState } from "react";
import Word from "./wordApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";

const AddWordFrom = (props) => {
  const [vocab, setVocab] = useState("");
  const [meaning, setMeaning] = useState("");
  const [fileSelected, setFileSelected] = useState();
  const [audioSelected, setAudioSelected] = useState();

  const { userName, idSource, idLevel } = useParams();

  let history = useHistory();

  const addWord = () => {
    var data = new FormData();
    data.append("idLevel", idLevel);
    data.append("vocab", vocab);
    data.append("meaning", meaning);
    data.append("imageWord", fileSelected);
    data.append("audioWord", audioSelected);
    Word.addWord(data).then((response) => {
      alert(response.data);
      history.push(`/${userName}/level/${idSource}/words/${idLevel}`);
    });
  };

  return (
    <>
      <div>
        <h3>Add vocab</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addWord();
          }}
          encType="multipart/form-data"
        >
          <label>Word : </label>
          <input
            type="text"
            onChange={(e) => {
              setVocab(e.target.value);
            }}
          />
          <label>Meaning : </label>
          <input
            type="text"
            onChange={(e) => {
              setMeaning(e.target.value);
            }}
          />
          <label for="imageWord">Select a file</label>
          <input
            type="file"
            name="imageWord"
            onChange={(e) => {
              setFileSelected(e.target.files[0]);
            }}
          />
          <label for="audioWord">Select a audio</label>
          <input
            type="file"
            name="audioWord"
            onChange={(e) => {
              setAudioSelected(e.target.files[0]);
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
export default AddWordFrom;
