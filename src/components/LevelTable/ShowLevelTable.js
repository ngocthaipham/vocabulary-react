import React, { useState, useEffect } from "react";
import Level from "./levelApi";
import Axios from "axios";
import ShowCourseTable from "../CourseTable/ShowCourseTable";
import AddLevelForm from "./AddLevelForm";
import EditLevelForm from "./EditLevelForm";
const ShowLevelTable = (props) => {
  const [levelsList, setLevelsList] = useState([]);
  const [editState, setEditState] = useState(false);
  const [currentLevel, setCurrentLevel] = useState({});
  const [idLevel, setIdLevel] = useState();
  const [level, setLevel] = useState("");
  const [idSource, setIdSource] = useState("");

  // useEffect(() => {
  //   Level.get().then((response) => {
  //     setLevelsList(response.data);
  //   });
  // }, []);

  useEffect(() => {
    Level.getLevelTable(1)
    .then((response) => {
      setLevelsList(response.data);
    });
  }, []);


  const render = (response) => {
    setLevelsList(response);
  };

  const a = () => {
    setLevelsList(props.array)
  }
  const showEditForm = (id) => {
    setCurrentLevel(levelsList[id - 1]);
    console.log(id);
    console.log(currentLevel);
    setEditState(true);
    console.log(props.array);
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
          />
          <div>
            <table border="5" cellPadding="5" id="level-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Level</th>
                  <th>ID Source</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="level-body">
                {levelsList.map((level) => (
                  <tr
                    id="id-level-table"
                    className={level.idLevel}
                    key={level.idLevel}
                  >
                    <td>{level.idLevel}</td>
                    <td>{level.level}</td>
                    <td>{level.idSource}</td>
                    <td>
                      <button disabled={disableTable()} className="view-btn">
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
        </div>
      )}
    </>
  );
};

export default ShowLevelTable;
