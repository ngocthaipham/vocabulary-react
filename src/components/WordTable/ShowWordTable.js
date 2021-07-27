import React, { useEffect, useState } from "react";
import Word from ".././WordTable/wordApi";
import ReactAudioPlayer from "react-audio-player";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import {
  faPlus,
  faPenSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
const ShowWordTable = (props) => {
  const [wordList, setWordList] = useState([]);
  const { userName, idSource, idLevel } = useParams();

  useEffect(
    () =>
      Word.getWordTable(idLevel).then((response) => {
        setWordList(response.data);
      }),
    []
  );
  const removeWord = (id) => {
    Word.deleteWord(id).then((response) => {
      alert("remove success");
      setWordList(wordList.filter((word) => word.id !== id));
    });
  };

  return (
    <>
      <Link to={`/${userName}/level/${idSource}/words/${idLevel}/addword`}>
        <button className="add-btn">
          <span className="text">Add a new word</span>
          <span className="add-icon">
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </button>
      </Link>
      <div>
        <table border="0" cellPadding="0" cellSpacing="0">
          <thead className="header">
            <tr>
              <th>ID</th>
              <th>ID Level</th>
              <th>Word</th>
              <th>Meaning</th>
              <th>Image</th>
              <th>Audio</th>
              <th>Actions</th>
              <th>
                <Link to={`/${userName}/levels/${idSource}`}>
                  <button className="back-btn">
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
            {wordList.map((word) => (
              <tr key={word.id}>
                <td>{word.id}</td>
                <td>{word.idLevel}</td>
                <td>{word.vocab}</td>
                <td>{word.meaning}</td>
                <td>
                  <img
                    className="image"
                    src={`http://localhost:5000/images/${word.imageWord}`}
                  ></img>
                </td>
                <td>
                  <ReactAudioPlayer
                    className="audio"
                    src={`http://localhost:5000/audios/${word.audioWord}`}
                    controls
                  />
                </td>
                <td>
                  <Link
                    to={`/${userName}/level/${idSource}/words/${idLevel}/editword/${word.id}/${word.vocab}/${word.meaning}`}
                  >
                    <button className="edit-btn">
                      <div>
                        Edit <FontAwesomeIcon icon={faPenSquare} />
                        <div className="circle"></div>
                      </div>
                    </button>
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      removeWord(word.id);
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
    </>
  );
};
export default ShowWordTable;
