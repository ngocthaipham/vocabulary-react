import React, { useState, useEffect } from "react";
import Level from "./levelApi";
import AddLevelForm from "./AddLevelForm";
import EditLevelForm from "./EditLevelForm";
import ShowWordTable from "../WordTable/ShowWordTable";

const ShowLevelTable = (props) => {
  const [levelsList, setLevelsList] = useState([]);
  const [editState, setEditState] = useState(false);
  const [currentLevel, setCurrentLevel] = useState({});
  const [idLevel, setIdLevel] = useState();
  const [level, setLevel] = useState("");
  const [idSource, setIdSource] = useState("");
  const [wordState, setWordState] = useState(false);
  const [wordList, setWordList] = useState([]);
  const [currentIdLevel, setCurrentIdLevel] = useState();

  const render = (response) => {
    setLevelsList(response);
  };

  const showEditForm = (id) => {
    for (let i = 0; i < props.levelsList.length; i++) {
      if (id === props.levelsList[i].idLevel) {
        setCurrentLevel(props.levelsList[i]);
      }
    }
    setCurrentIdLevel(id);
    console.log(id);
    console.log(currentLevel);
    setEditState(true);
  };

  function disableTable() {
    if (!editState) {
      return false;
    } else {
      return true;
    }
  }

  const removeLevel = (id) => {
    Level.deleteLevel(id).then(() => {
      alert("remove success");
      setLevelsList(levelsList.filter((level) => level.idLevel !== id));
    });
  };

  const showWord = (id) => {
    setWordState(true);
    setCurrentIdLevel(id);
    Level.getWordTable(id).then((response) => {
      setWordList(response.data);
      console.log(levelsList);
    });
  };

  function highlight(id) {
    if (id === currentIdLevel) {
      return {
        backgroundColor: "pink",
      };
    }
    return {
      backgroundColor: "white",
    };
  }

  function cancel() {
    props.setLevelState(false);
    props.setCurrentId(0);
  }

  return (
    <>
      {!props.levelState ? (
        <p></p>
      ) : (
        <div>
          <AddLevelForm render={render} />
          <EditLevelForm
            editState={editState}
            setEditState={setEditState}
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            render={render}
            idLevel={idLevel}
            level={level}
            idSource={idSource}
            currentIdLevel={currentIdLevel}
            setCurrentIdLevel={setCurrentIdLevel}
          />
          <div>
            <table border="5" cellPadding="5" id="level-table">
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
              <tbody id="level-body">
                {props.levelsList.map((level) => (
                  <tr key={level.idLevel} style={highlight(level.idLevel)}>
                    <td>{level.idLevel}</td>
                    <td>{level.level}</td>
                    <td>{level.idSource}</td>
                    <td>
                      <button
                        onClick={() => {
                          showWord(level.idLevel);
                        }}
                        disabled={disableTable()}
                        className="view-btn"
                      >
                        View
                      </button>
                      <button
                        disabled={disableTable()}
                        onClick={() => {
                          showEditForm(level.idLevel);
                        }}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        disabled={disableTable()}
                        onClick={() => {
                          removeLevel(level.idLevel);
                        }}
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
          <ShowWordTable
            wordState={wordState}
            setWordState={setWordState}
            wordList={wordList}
            setCurrentIdLevel={setCurrentIdLevel}
          />
        </div>
      )}
    </>
  );
};

export default ShowLevelTable;
