import React, { useState } from "react";
import Word from "./wordApi";
const AddWordFrom = (props) => {
  const [id, setId] = useState();
  const [vocab, setVocab] = useState("");
  const [meaning, setMeaning] = useState("");
  const [idLevel, setIdLevel] = useState();
  const [addState, setAddState] = useState(false);

  const update = () => {
    Word.getWordTable(props.currentIdLevel).then((response) => {
      props.reRender(response.data);
    });
  };

  const addWord = () => {
    var data = {
      id: id,
      idLevel: idLevel,
      vocab: vocab,
      meaning: meaning,
    };
    Word.addWord(data).then((response) => {
      alert(response.data);
      setAddState(false);
      update();
    });
  };

  return (
    <>
      {!addState ? (
        <button
          onClick={() => {
            setAddState(true);
          }}
        >
          Add a new word
        </button>
      ) : (
        <div>
          <h3>Add vocab</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addWord();
            }}
          >
            <label>ID</label>
            <input
              type="number"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <label>ID Level</label>
            <input
              type="number"
              onChange={(e) => {
                setIdLevel(e.target.value);
              }}
            />
            <label>Word</label>
            <input
              type="text"
              onChange={(e) => {
                setVocab(e.target.value);
              }}
            />
            <label>Meaning</label>
            <input
              type="text"
              onChange={(e) => {
                setMeaning(e.target.value);
              }}
            />
            <button type="submit">Add new vocab</button>
            <button
              onClick={() => {
                setAddState(false);
              }}
              type="button"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default AddWordFrom;
