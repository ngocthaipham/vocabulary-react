import React, { useEffect, useState } from "react";
import Word from ".././WordTable/wordApi";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AddButton from "../Button/AddButton";
import EditButton from "../Button/EditButton";
import DeleteButton from "../Button/DeleteButton";
import BackButton from "../Button/BackButton";

const ShowWordTable = () => {
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
    Word.deleteWord(id).then(() => {
      alert("remove success");
      setWordList(wordList.filter((word) => word.id !== id));
    });
  };

  return (
    <>
      <h1>English Course</h1>

      <Link to={`/${userName}/level/${idSource}/words/${idLevel}/addword`}>
        <AddButton text={"Add a new word"} />
      </Link>
      <Link to={`/${userName}/level/${idSource}/words/${idLevel}/test`}>
        <button className="review-btn">Speed Review</button>
      </Link>
      <div className="back-btn-container">
        <Link to={`/${userName}/levels/${idSource}`}>
          <BackButton />
        </Link>
      </div>
      <div>
        <table border="0" cellPadding="0" cellSpacing="0">
          <thead className="header">
            <tr>
              <th>Word</th>
              <th>Meaning</th>
              <th>Image</th>
              <th>Audio</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wordList.map((word) => (
              <tr key={word.id}>
                <td>{word.vocab}</td>
                <td>{word.meaning}</td>
                <td>
                  <img
                    className="image"
                    src={`http://localhost:5000/images/${word.imageWord}`}
                  ></img>
                </td>
                <td>
                  <label>
                    <img
                      onClick={() => {
                        var audio = new Audio(
                          `http://localhost:5000/audios/${word.audioWord}`
                        );
                        audio.play();
                      }}
                      className="audio-image"
                      src="http://localhost:5000/images/audio.jpg"
                    ></img>
                  </label>
                </td>
                <td>
                  <Link
                    to={`/${userName}/level/${idSource}/words/${idLevel}/editword/${word.id}/${word.vocab}/${word.meaning}/${word.imageWord}/${word.audioWord}`}
                  >
                    <EditButton />
                  </Link>
                  <DeleteButton remove={removeWord} id={word.id} />
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
