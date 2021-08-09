import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "./SpeedReview.css";

const Question = (props) => {
  const [wordList, setWordList] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState();
  const [clicked, setClicked] = useState(false);

  const { idLevel } = useParams();
  const questionList = [];
  var audio = new Audio();
  useEffect(() => {
    Axios.get(`http://localhost:5000/vocabs/${idLevel}`).then((response) => {
      shuffle(response.data);
      setWordList(response.data);
    });
  }, []);

  useEffect(() => {
    wordList.forEach((item, index) =>
      questionList.push({
        question: <label className="question-content">{item.meaning}</label>,
        answer: item.vocab,
        options: shuffle([
          item.vocab,
          wordList[props.random(wordList.length / 3, 0, index)].vocab,
          wordList[
            props.random((wordList.length / 3) * 2, wordList.length / 3, index)
          ].vocab,
          wordList[props.random(wordList.length, (wordList.length / 3) * 2, index)]
            .vocab,
        ]),
      })
    );
    wordList.forEach((item, index) =>
      questionList.push({
        question: (
          <img
            src={`http://localhost:5000/images/${item.imageWord}`}
            className="image-question"
          />
        ),
        answer: item.vocab,
        options: shuffle([
          item.vocab,
          wordList[props.random(wordList.length / 3, 0, index)].vocab,
          wordList[
            props.random((wordList.length / 3) * 2, wordList.length / 3, index)
          ].vocab,
          wordList[props.random(wordList.length, (wordList.length / 3) * 2, index)]
            .vocab,
        ]),
      })
    );
    wordList.forEach((item, index) =>
      questionList.push({
        question: (
          <div>
            <label>
              <audio
                style={{ display: "none" }}
                src={`http://localhost:5000/audios/${item.audioWord}`}
                autoPlay
              ></audio>
              <img
                onClick={() => {
                  var audio = new Audio(
                    `http://localhost:5000/audios/${item.audioWord}`
                  );
                  audio.play();
                }}
                className="audio-image"
                src="http://localhost:5000/images/audio.jpg"
              ></img>
            </label>
          </div>
        ),
        answer: item.vocab,
        options: shuffle([
          item.vocab,
          wordList[props.random(wordList.length / 3, 0, index)].vocab,
          wordList[
            props.random((wordList.length / 3) * 2, wordList.length / 3, index)
          ].vocab,
          wordList[props.random(wordList.length, (wordList.length / 3) * 2, index)]
            .vocab,
        ]),
      })
    );
    shuffle(questionList);
    setQuestions(questionList);
  }, [wordList]);

  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  function disabled() {
    if (clicked) {
      return true;
    }
  }

  function color(option, optionSelected) {
    if (optionSelected === selected && option !== questions[current].answer) {
      return { backgroundColor: "red" };
    }
    if (clicked && option === questions[current].answer) {
      return { backgroundColor: "green" };
    }
    return { backgroundColor: "white" };
  }
  function click(option, optionSelected) {
    setClicked(true);
    setSelected(optionSelected);
    if (option === questions[current].answer) {
      props.updateScore(props.score + 1);
      audio = new Audio("http://localhost:5000/audios/right-answer.mp3");
      audio.play();
    } else {
      audio = new Audio("http://localhost:5000/audios/wrong-answer.wav");
      audio.play();
    }
    if (current === questions.length - 1) {
      props.updateShowScore(true);
    }
    setTimeout(() => {
      setCurrent(current + 1);
      setClicked(false);
      setSelected();
    }, 2000);
  }
  return (
    <>
      {questions[current] && (
        <div className="question-container">
          <p className="question">{questions[current].question}</p>
        </div>
      )}
      <br />
      <div className="answer-container">
        {questions[current] &&
          questions[current].options.map((option, index) => (
            <button
              key={index}
              style={color(option, index)}
              disabled={disabled()}
              className="answer"
              onClick={() => {
                click(questions[current].options[index], index);
              }}
            >
              {option}
            </button>
          ))}
      </div>
    </>
  );
};
export default Question;
