import React, { useState, useEffect } from "react";
import Word from ".././WordTable/wordApi";
import AddWordForm from "./AddWordForm";
import EditWordForm from "./EditWordForm";
const ShowWordTable = () => {
  const [wordList, setWordList] = useState([]);
  const [editState, setEditState] = useState(false);
  const [currentWord, setCurrentWord] = useState({});
  const [id, setId] = useState();

  useEffect(() => {
    Word.get().then((response) => {
      setWordList(response.data);
    });
  },[]);

  const render = (response) => {
    setWordList(response);
  };

  const showEditForm = (id) => {
    setCurrentWord(wordList[id - 1]);
    console.log(id);
    console.log(currentWord);
    setEditState(true);
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


  return (
    <>
      <AddWordForm render={render} />
      <EditWordForm
      id={id}
        editState={editState}
        setEditState={setEditState}
        currentWord={currentWord}
        render={render}
      />
      <table border="5" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Word</th>
            <th>Meaning</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {wordList.map((word) => (
            <tr key={word.id}>
              <td>{word.id}</td>
              <td>{word.vocab}</td>
              <td>{word.meaning}</td>
              <td>
                <button onClick={() => {showEditForm(word.id)}}
                disabled={disableTable()}
                className="edit-btn">Edit</button>
                <button onClick={() =>{removeWord(word.id)}}
                disabled={disableTable()}
                className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default ShowWordTable;
