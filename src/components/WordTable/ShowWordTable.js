import React, { useState } from "react";
import Word from ".././WordTable/wordApi";
import AddWordForm from "./AddWordForm";
import EditWordForm from "./EditWordForm";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faPenSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
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
        backgroundColor: "rgba(126, 228, 214, 0.3)",
      };
    }
    return {
      backgroundColor: "",
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
            updateCurrentIdWord={props.updateCurrentIdWord}
          />
          <table border="0" cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>ID Level</th>
                <th>Word</th>
                <th>Meaning</th>
                <th>Actions</th>
                <th>
                  <Link to={`/levels/${props.currentIdLevel}`}>
                    <button className="back-btn"
                    onClick={cancel}>
                    <div class="outer">
                          <div class="inner">
                            <label className="back-btn-content">Back</label>
                          </div>
                        </div>
                      </button>
                  </Link>
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
                      className="edit-btn"
                      onClick={() => {
                        showEditForm(word.id);
                      }}
                      disabled={disableButton()}
                    >
                      <div>
                        Edit <FontAwesomeIcon icon={faPenSquare} />
                        <div className="circle"></div>
                      </div>
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        removeWord(word.id);
                      }}
                      disabled={disableButton()}
                    >
                      <span className="text">
                        Delete
                        <span className="trash-icon">
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </span>
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
