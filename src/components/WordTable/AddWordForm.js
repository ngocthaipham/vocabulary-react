import React, { useState } from 'react'
import Word from './wordApi'
const AddWordFrom = (props) => {
  const [id, setId] = useState();
  const [vocab, setVocab] = useState("");
  const [meaning, setMeaning] = useState("");
  const [idLevel, setIdLevel] = useState();
  const [addState, setAddState] = useState(false);

  const showAddForm = () => {
    setAddState(true);
  };
  const hideAddForm = () => {
    setAddState(false);
  };

  const update = () => {
    Word.get()
    .then(response => {
        props.render(response.data)
    })
  } 

  const addWord = () => {
      var data = {
          id: id,
          idLevel: idLevel,
          vocab: vocab,
          meaning: meaning
      }
      Word.addWord(data)
      .then(response => {
          alert(response.data)
          setAddState(false)
          update()
      })
    
  }

  return (
    <>
    {!addState ? (
      <button onClick={showAddForm}>Add a new word</button>
    ) : (
      <div id="add-vocab-form">
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
            name="id-vocab"
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
          <button 
          type="submit">Add new vocab</button>
          <button onClick={hideAddForm}
          type="button">Cancel</button>
        </form>
      </div>
    )}
    </>
  );
};
export default AddWordFrom;
