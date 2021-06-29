import React, { useState } from "react";
import Word from "./wordApi";
const EditWordForm = (props) => {
  const [id, setId] = useState();
  const [vocab, setVocab] = useState("");
  const [meaning, setMeaning] = useState("");
  const [idLevel, setIdLevel] = useState();

  const update = () => {
    Word.get()
    .then(response => {
        props.render(response.data)
    })
  }

const updateWord = (id) => {
    var data = {
        idLevel: idLevel,
        vocab: vocab,
        meaning: meaning
    }

    Word.editWord(id, data)
    .then(response=> {
        alert(response.data)
        update()
    })
}


  return (
    <>
    {!props.editState ? (
        <p></p>
    ) : (
      <div id="update-vocab-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateWord(props.currentWord.id)
            props.setEditState(false)
          }}
        >
          <label>ID</label>
          <input
            type="number"
            id="id-vocab-input"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <label>ID Level</label>
          <input
            type="number"
            name="id-level"
            onChange={(e) => {
              setIdLevel(e.target.value);
            }}
          />
          <label>Word</label>
          <input
            type="text"
            name="word"
            onChange={(e) => {
              setVocab(e.target.value);
            }}
          />
          <label>Meaning</label>
          <input
            type="text"
            name="meaning"
            onChange={(e) => {
              setMeaning(e.target.value);
            }}
          />
          <button type="submit">Save</button>
          <button onClick={()=>{props.setEditState(false)}}
          type="button">Cancel</button>
        </form>
      </div>
    )}
    </>
  );
};
export default EditWordForm;
