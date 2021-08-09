import React, { useState } from "react";
import Question from "./Question";
import { useParams, useHistory } from "react-router-dom";
import "./SpeedReview.css";
const SpeedReview = () => {
  const [score, setScore] = useState(0);
  const [isShowScore, setIsShowScore] = useState(false);

  const { userName, idSource, idLevel } = useParams();
  const history = useHistory();

  const updateScore = (res) => {
    setScore(res);
  };
  const updateShowScore = (res) => {
    setIsShowScore(res);
  };

  function random(max, min, number) {
    var i = Math.floor(Math.random() * (max - min) + min);
    if (i === number) {
      return random(max, min, number);
    }
    return i;
  }

  return (
    <>
      {isShowScore ? (
        <div>
          You answer correct {score} questions.
          <br></br>
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            again
          </button>
          <button
            onClick={() => {
              history.push(`/${userName}/level/${idSource}/words/${idLevel}`);
            }}
          >
            back!
          </button>
        </div>
      ) : (
        <Question
          updateScore={updateScore}
          score={score}
          updateShowScore={updateShowScore}
          random={random}
        />
      )}
    </>
  );
};
export default SpeedReview;
