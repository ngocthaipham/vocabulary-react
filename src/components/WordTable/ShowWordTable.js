import React, { useState, useEffect } from "react";
import Word from ".././WordTable/wordApi";
import AddWordForm from "./AddWordForm";
import EditWordForm from "./EditWordForm";
const ShowWordTable = (props) => {
  const [wordList, setWordList] = useState([]);
  const [editState, setEditState] = useState(false);
  const [currentWord, setCurrentWord] = useState({});
  const [id, setId] = useState();
  const [currentIdWord, setCurrentIdWord] = useState();

  const render = (response) => {
    setWordList(response);
  };

  const showEditForm = (id) => {
    for (let i = 0; i < props.wordList.length; i++) {
      if (id === props.wordList[i].id) {
        setCurrentWord(props.wordList[i]);
      }
    }
    console.log(id);
    console.log(currentWord);
    setEditState(true);
    setCurrentIdWord(id);
  };

  function disableTable() {
    if (!editState) {
      return false;
    } else {
      return true;
    }
  }

  const removeWord = (id) => {
    Word.deleteWord(id).then(() => {
      alert("remove success");
      setWordList(wordList.filter((word) => word.id !== id));
    });
  };

  function highlight(id) {
    if (id === currentIdWord) {
      return {
        backgroundColor: "pink",
      };
    }
    return {
      backgroundColor: "white",
    };
  }

  function cancel() {
    props.setWordState(false);
    props.setCurrentIdLevel(0);
  }

  return (
    <>
      {!props.wordState ? (
        <p></p>
      ) : (
        <div>
          <AddWordForm render={render} />
          <EditWordForm
            id={id}
            editState={editState}
            setEditState={setEditState}
            currentWord={currentWord}
            render={render}
            currentIdWord={currentIdWord}
          />
          <table border="5" cellPadding="5">
            <thead>
              <tr>
                <th>ID</th>
                <th>ID Level</th>
                <th>Word</th>
                <th>Meaning</th>
                <th>Actions</th>
                <th>
                  <button onClick={cancel}>X</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {props.wordList.map((word) => (
                <tr key={word.id} style={highlight(word.id)}>
                  <td>{word.id}</td>
                  <td>{word.idLevel}</td>
                  <td>{word.vocab}</td>
                  <td>{word.meaning}</td>
                  <td>
                    <button
                      onClick={() => {
                        showEditForm(word.id);
                      }}
                      disabled={disableTable()}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        removeWord(word.id);
                      }}
                      disabled={disableTable()}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
export default ShowWordTable;
