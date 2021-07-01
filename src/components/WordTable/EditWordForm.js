import React, { useState } from "react";
import Word from "./wordApi";
const EditWordForm = (props) => {
  const [id, setId] = useState();
  const [idLevel, setIdLevel] = useState();
  const [vocab, setVocab] = useState("");
  const [meaning, setMeaning] = useState("");

  const update = () => {
    Word.getWordTable(props.currentIdLevel).then((response) => {
      props.reRender(response.data);
    });
  };

  const updateWord = (id) => {
    var data = {
      idLevel: idLevel,
      vocab: vocab,
      meaning: meaning,
    };

    Word.editWord(id, data).then((response) => {
      alert(response.data);
      update();
    });
  };

  function cancel() {
    props.updateEditForm(false);
    props.updateCurrentIdWord(0);
  }

  return (
    <>
      {!props.isShowEditForm ? (
        <p></p>
      ) : (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateWord(props.currentIdWord);
              props.updateEditForm(false);
            }}
          >
            <label>ID</label>
            <input
              type="number"
              defaultValue={props.currentIdWord}
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <label>ID Level</label>
            <input
              type="number"
              defaultValue={props.currentWord.idLevel}
              onChange={(e) => {
                setIdLevel(e.target.value);
              }}
            />
            <label>Word</label>
            <input
              type="text"
              defaultValue={props.currentWord.vocab}
              onChange={(e) => {
                setVocab(e.target.value);
              }}
            />
            <label>Meaning</label>
            <input
              type="text"
              defaultValue={props.currentWord.meaning}
              onChange={(e) => {
                setMeaning(e.target.value);
              }}
            />
            <button type="submit">Save</button>
            <button onClick={cancel} type="button">
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default EditWordForm;
