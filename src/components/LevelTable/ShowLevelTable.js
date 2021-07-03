import React, { useState } from "react";
import Level from "./levelApi";
import AddLevelForm from "./AddLevelForm";
import EditLevelForm from "./EditLevelForm";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faPenSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ShowLevelTable = (props) => {
  const [isShowEditForm, setIsShowEditForm] = useState(false);
  const [currentLevel, setCurrentLevel] = useState({});

  const reRender = (response) => {
    props.updateLevelList(response);
  };

  const renderWordList = (response) => {
    props.updateWordList(response);
  };

  const showEditForm = (id) => {
    for (let i = 0; i < props.levelList.length; i++) {
      if (id === props.levelList[i].idLevel) {
        setCurrentLevel(props.levelList[i]);
      }
    }
    props.updateCurrentIdLevel(id);
    setIsShowEditForm(true);
  };

  const setId = (res) => {
    props.updateCurrentIdLevel(res);
  };

  const updateEditForm = (res) => {
    setIsShowEditForm(res);
  };

  function disableButton() {
    if (!isShowEditForm) {
      return false;
    } else {
      return true;
    }
  }

  const renderAfterRemove = () => {
    Level.getLevelTable(props.currentIdCourse).then((response) => {
      reRender(response.data);
    });
  };

  const removeLevel = (id) => {
    Level.deleteLevel(id).then(() => {
      alert("remove success");
      renderAfterRemove();
    });
  };

  const showWord = (id) => {
    props.showWordList(true);
    props.updateCurrentIdLevel(id);
    Level.getWordTable(id).then((response) => {
      renderWordList(response.data);
    });
  };

  function highlight(id) {
    if (id === props.currentIdLevel) {
      return {
        backgroundColor: "rgba(126, 228, 214, 0.3)",
      };
    }
    return {
      backgroundColor: "",
    };
  }

  function cancel() {
    props.showLevelList(false);
    props.updateCurrentIdCourse(0);
  }

  return (
    <>
      {!props.isShowLevelList ? (
        <p></p>
      ) : (
        <div>
          <AddLevelForm
            reRender={reRender}
            currentIdCourse={props.currentIdCourse}
          />
          <EditLevelForm
            setId={setId}
            isShowEditForm={isShowEditForm}
            updateEditForm={updateEditForm}
            currentLevel={currentLevel}
            reRender={reRender}
            currentIdLevel={props.currentIdLevel}
            currentIdCourse={props.currentIdCourse}
          />
          <div>
            <table border="0" cellPadding="0" cellSpacing="0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Level</th>
                  <th>ID Source</th>
                  <th>Actions</th>
                  <th>
                    <Link to={"/"}>
                      <button className="back-btn" onClick={cancel}>
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
                {props.levelList.map((level) => (
                  <tr key={level.idLevel} style={highlight(level.idLevel)}>
                    <td>{level.idLevel}</td>
                    <td>{level.level}</td>
                    <td>{level.idSource}</td>
                    <td>
                      <Link to={`/words/${level.idLevel}`}>
                        <button
                          className="view-btn"
                          onClick={() => {
                            showWord(level.idLevel);
                          }}
                          disabled={disableButton()}
                        >
                          <div>
                            View <FontAwesomeIcon icon={faAngleRight} />
                          </div>
                        </button>
                      </Link>
                      <button
                        className="edit-btn"
                        disabled={disableButton()}
                        onClick={() => {
                          showEditForm(level.idLevel);
                        }}
                      >
                        <div>
                          Edit <FontAwesomeIcon icon={faPenSquare} />
                          <div className="circle"></div>
                        </div>
                      </button>
                      <button
                        className="delete-btn"
                        disabled={disableButton()}
                        onClick={() => {
                          removeLevel(level.idLevel);
                        }}
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
        </div>
      )}
    </>
  );
};

export default ShowLevelTable;
