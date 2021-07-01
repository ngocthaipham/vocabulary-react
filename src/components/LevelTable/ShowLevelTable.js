import React, { useState, useEffect } from "react";
import Level from "./levelApi";
import AddLevelForm from "./AddLevelForm";
import EditLevelForm from "./EditLevelForm";

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
        backgroundColor: "pink",
      };
    }
    return {
      backgroundColor: "white",
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
            <table border="5" cellPadding="5">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Level</th>
                  <th>ID Source</th>
                  <th>Actions</th>
                  <th>
                    <button onClick={cancel}>X</button>
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
                      <button
                        onClick={() => {
                          showWord(level.idLevel);
                        }}
                        disabled={disableButton()}
                      >
                        View
                      </button>
                      <button
                        disabled={disableButton()}
                        onClick={() => {
                          showEditForm(level.idLevel);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        disabled={disableButton()}
                        onClick={() => {
                          removeLevel(level.idLevel);
                        }}
                      >
                        Delete
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
