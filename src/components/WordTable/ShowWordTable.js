import React, { useState, useEffect } from "react";
import Word from ".././WordTable/wordApi";
import AddWordForm from "./AddWordForm";
import EditWordForm from "./EditWordForm";
const ShowWordTable = (props) => {
  const [currentWord, setCurrentWord] = useState({});
  const [isShowEditForm, setIsShowEditForm] = useState(false);

  const reRender = (response) => {
    props.updateWordList(response);
  };

  const showEditForm = (id) => {
    for (let i = 0; i < props.wordList.length; i++) {
      if (id === props.wordList[i].id) {
        setCurrentWord(props.wordList[i]);
      }
    }
    props.updateCurrentIdWord(id);
    setIsShowEditForm(true);
  };

  function disableButton() {
    if (!isShowEditForm) {
      return false;
    } else {
      return true;
    }
  }

  const setIdWord = (res) => {
    props.updateCurrentIdWord(res);
  };

  const updateEditForm = (res) => {
    setIsShowEditForm(res);
  };

  const removeWord = (id) => {
    Word.deleteWord(id).then(() => {
      alert("remove success");
      renderAfterRemove();
    });
  };

  const renderAfterRemove = () => {
    Word.getWordTable(props.currentIdLevel).then((response) => {
      reRender(response.data);
    });
  };

  function highlight(id) {
    if (id === props.currentIdWord) {
      return {
        backgroundColor: "pink",
      };
    }
    return {
      backgroundColor: "white",
    };
  }

  function cancel() {
    props.showWordList(false);
    props.updateCurrentIdLevel(0);
  }

  return (
    <>
      {!props.isShowWordList ? (
        <p></p>
      ) : (
        <div>
          <AddWordForm
            reRender={reRender}
            currentIdLevel={props.currentIdLevel}
          />
          <EditWordForm
            isShowEditForm={isShowEditForm}
            reRender={reRender}
            updateEditForm={updateEditForm}
            currentIdLevel={props.currentIdLevel}
            currentWord={currentWord}
            currentIdWord={props.currentIdWord}
            setIdWord={setIdWord}
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
                      disabled={disableButton()}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        removeWord(word.id);
                      }}
                      disabled={disableButton()}
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
