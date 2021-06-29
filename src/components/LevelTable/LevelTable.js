import React, { useState, useEffect } from "react";
import Axios from "axios";

const LevelTable = () => {
  const [levelsList, setLevelsList] = useState([]);
  const [idLevel, setIdLevel] = useState();
  const [level, setLevel] = useState();
  const [idSource, setIdSource] = useState();
  const [vocabList, setVocabList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/levels").then((response) => {
      setLevelsList(response.data);
    });
  }, []);

  const viewVocab = (id) => {
    Axios.get(`http://localhost:5000/words/${id}`).then((response) => {
      setVocabList(response.data);
    });
  };

  const addLevel = () => {
    Axios.post("http://localhost:5000/levels", {
      idLevel: idLevel,
      level: level,
      idSource: idSource,
    }).then((response) => {
      alert("add level success");
      setLevelsList(response.data);
    });
  };

  const editLevel = (id) => {
    Axios.put(`http://localhost:5000/levels/${id}`, {
      idLevel: idLevel,
      level: level,
      idSource: idSource,
    }).then(() => {
      setLevelsList({ ...levelsList });
    });
  };

  const deleteLevel = (id) => {
    Axios.delete(`http://localhost:5000/levels/${id}`).then((response) => {
      setLevelsList(
        levelsList.filter((level) => {
          return level.idLevel !== id;
        })
      );
    });
  };

  const showLevelForm = () => {
    document.getElementById("add-level-form").style.display = "block";
    document.getElementById("add-level-btn").style.display = "none";
  };

  const cancelAddLevelForm = () => {
    document.getElementById("add-level-form").style.display = "none";
    document.getElementById("add-level-btn").style.display = "block";
  };

  const showUpdateLevelForm = (id) => {
    console.log(id);
    document.getElementById("update-level-form").style.display = "block";
    document.getElementById("id-level-input").value = id;
    let disLevelView = document.querySelectorAll(".view-btn");
    let disLevelEdit = document.querySelectorAll(".edit-btn");
    let disLevelDelete = document.querySelectorAll(".delete-btn");

    for (let i = 0; i < disLevelView.length; i++) {
      disLevelView[i].disabled = true;
    }

    for (let i = 0; i < disLevelEdit.length; i++) {
      disLevelEdit[i].disabled = true;
    }

    for (let i = 0; i < disLevelDelete.length; i++) {
      disLevelDelete[i].disabled = true;
    }
  };

  const cancelUpdateLevelForm = () => {
    document.getElementById("update-level-form").style.display = "none";
    document.getElementById("add-btn").style.display = "block";
    let disLevelView = document.querySelectorAll(".view-btn");
    let disLevelEdit = document.querySelectorAll(".edit-btn");
    let disLevelDelete = document.querySelectorAll(".delete-btn");

    for (let i = 0; i < disLevelView.length; i++) {
      disLevelView[i].disabled = false;
    }

    for (let i = 0; i < disLevelEdit.length; i++) {
      disLevelEdit[i].disabled = false;
    }

    for (let i = 0; i < disLevelDelete.length; i++) {
      disLevelDelete[i].disabled = false;
    }
  };

  function myFunction(id) {
    var table = document.getElementById("level-table");
    var tbody = document.getElementById("level-body");
    var tr = document.getElementById("id-level-table");
    console.log(tr, table);
    //   for (var i = 0; i < length.childNodes.length; i++) {
    //     if (length.childNodes[i].nodeType == 1) {
    //     length.childNodes[i].style.backgroundColor = "white"
    // }
    // tr.style.backgroundColor = "gray"
    // }
  }

  return (
    <>
      <br />
      <button
        id="add-level-btn"
        onClick={() => {
          showLevelForm();
        }}
      >
        Add a new level
      </button>
      <br />

      <div id="add-level-form" style={{ display: "none" }}>
        <h3>Add level</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addLevel();
          }}
        >
          <label>ID</label>
          <input
            type="number"
            name="id-level"
            onChange={(e) => {
              setIdLevel(e.target.value);
            }}
          />
          <label>Level</label>
          <input
            type="number"
            name="level"
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          />
          <label>ID Source</label>
          <input
            type="number"
            name="id-source"
            onChange={(e) => {
              setIdSource(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={() => {
              cancelAddLevelForm();
            }}
          >
            Add new level
          </button>
          <button
            type="button"
            onClick={() => {
              cancelAddLevelForm();
            }}
          >
            Cancel
          </button>
        </form>
      </div>
      <br />
      <div id="update-level-form" style={{ display: "none" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editLevel(document.getElementById("id-level-input").value);
          }}
        >
          <label>ID</label>
          <input
            type="number"
            id="id-level-input"
            onChange={(e) => {
              setIdLevel(e.target.value);
            }}
          />
          <label>New Level</label>
          <input
            type="number"
            id="level"
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          />
          <label>New ID Source</label>
          <input
            type="number"
            name="id-source"
            onChange={(e) => {
              setIdSource(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={() => {
              cancelUpdateLevelForm();
            }}
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              cancelUpdateLevelForm();
            }}
          >
            Cancel
          </button>
        </form>
      </div>

      <br />
      <div>
        <table
          border="5"
          cellPadding="5"
          id="level-table"
          
        >
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
                  <button
                    onClick={() => {
                      myFunction(level.idLevel);
                    }}
                    className="view-btn"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      showUpdateLevelForm(level.idLevel);
                    }}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteLevel(level.idLevel);
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
    </>
  );
};

export default LevelTable;
