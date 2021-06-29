import React, { useState, useEffect } from "react";
import Axios from "axios";

const WordTable = () => {
  const [vocabList, setVocabList] = useState([]);
  const [id, setId] = useState();
  const [vocab, setVocab] = useState("");
  const [meaning, setMeaning] = useState("");
  const [idLevel, setIdLevel] = useState();

  useEffect(() => {
    Axios.get("http://localhost:5000/words").then((response) => {
      setVocabList(response.data);
    });
  }, []);

  const addWord = () => {
    Axios.post("http://localhost:5000/words", {
      id: id,
      idLevel: idLevel,
      vocab: vocab,
      meaning: meaning,
    }).then((response) => {
      alert("add word success");
      setVocabList(response.data);
    });
  };

  const editWord = (id) => {
    Axios.put(`http://localhost:5000/words/${id}`, {
      id: id,
      idLevel: idLevel,
      vocab: vocab,
      meaning: meaning,
    }).then(() => {
      alert("update success");
      setVocabList({ ...vocabList });
    });
  };

  const deleteWord = (id) => {
    Axios.delete(`http://localhost:5000/words/${id}`).then((response) => {
      setVocabList(
        vocabList.filter((word) => {
          return word.id !== id;
        })
      );
    });
  };

  const showAddVocabForm = () => {
    document.getElementById("add-vocab-form").style.display = "block";
    document.getElementById("add-vocab-btn").style.display = "none";
  };

  const cancelAddVocabForm = () => {
    document.getElementById("add-vocab-form").style.display = "none";
    document.getElementById("add-vocab-btn").style.display = "block";
  };

  const showUpdateVocabForm = (id) => {
    console.log(id);
    document.getElementById("update-vocab-form").style.display = "block";
    document.getElementById("id-vocab-input").value = id;
    let disVocabView = document.querySelectorAll(".view-btn");
    let disVocabEdit = document.querySelectorAll(".edit-btn");
    let disVocabDelete = document.querySelectorAll(".delete-btn");

    for (let i = 0; i < disVocabView.length; i++) {
      disVocabView[i].disabled = true;
    }

    for (let i = 0; i < disVocabEdit.length; i++) {
      disVocabEdit[i].disabled = true;
    }

    for (let i = 0; i < disVocabDelete.length; i++) {
      disVocabDelete[i].disabled = true;
    }
  };

  const cancelUpdateVocabForm = () => {
    document.getElementById("update-vocab-form").style.display = "none";
    document.getElementById("add-vocab-btn").style.display = "block";
    let disVocabView = document.querySelectorAll(".view-btn");
    let disVocabEdit = document.querySelectorAll(".edit-btn");
    let disVocabDelete = document.querySelectorAll(".delete-btn");

    for (let i = 0; i < disVocabView.length; i++) {
      disVocabView[i].disabled = false;
    }

    for (let i = 0; i < disVocabEdit.length; i++) {
      disVocabEdit[i].disabled = false;
    }

    for (let i = 0; i < disVocabDelete.length; i++) {
      disVocabDelete[i].disabled = false;
    }
  };

  return (
    <>
      <button
        id="add-vocab-btn"
        onClick={() => {
          showAddVocabForm();
        }}
      >
        Add a new course
      </button>
      <br />
      <div id="add-vocab-form" style={{ display: "none" }}>
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
            type="submit"
            onClick={() => {
              cancelAddVocabForm();
            }}
          >
            Add new vocab
          </button>
          <button
            type="button"
            onClick={() => {
              cancelAddVocabForm();
            }}
          >
            Cancel
          </button>
        </form>
      </div>
      <br />
      <div id="update-vocab-form" style={{ display: "none" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editWord(document.getElementById("id-vocab-input").value);
          }}
        >
          <label>ID</label>
          <input
            type="number"
            id="id-vocab-input"
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
            type="submit"
            onClick={() => {
              cancelUpdateVocabForm();
            }}
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              cancelUpdateVocabForm();
            }}
          >
            Cancel
          </button>
        </form>
      </div>

      <table border="5" cellPadding="5" style={{ display: "none" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Word</th>
            <th>Meaning</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vocabList.map((word) => (
            <tr key={word.id}>
              <td>{word.id}</td>
              <td>{word.vocab}</td>
              <td>{word.meaning}</td>
              <td>
                <button
                  onClick={() => {
                    showUpdateVocabForm(word.id);
                  }}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    deleteWord(word.id);
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
    </>
  );
};

export default WordTable;
