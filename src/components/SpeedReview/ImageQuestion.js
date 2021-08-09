import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "./SpeedReview.css";

const ImageQuestion = (props) => {
  const [imageQuestions, setImageQuestions] = useState([]);
  const [answerOptions, setAnswerOptions] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(false);
  const [answerSelected, setAnswerSelected] = useState();

  const { userName, idSource, idLevel } = useParams();
  const data = [
    {
      questions: (
        <img
          className="image-question"
          src={`http://localhost:5000/images/${imageQuestions[currentQuestion]}`}
        />
      ),
      answers: [
        {
          id: 0,
          answer: answerOptions[currentQuestion],
          isCorrect: true,
        },
        {
          id: 1,
          answer: answerOptions[props.random(9, 6, currentQuestion)],
          isCorrect: false,
        },
        {
          id: 2,
          answer: answerOptions[props.random(6, 3, currentQuestion)],
          isCorrect: false,
        },
        {
          id: 3,
          answer: answerOptions[props.random(3, 0, currentQuestion)],
          isCorrect: false,
        },
      ],
    },
  ];

  useEffect(() => {
    Axios.get(`http://localhost:5000/vocabs/${idLevel}`).then((response) => {
      setImageQuestions(response.data.result.map((question) => question.imageWord));
      setAnswerOptions(response.data.result.map((answer) => answer.vocab));
    });
  }, []);

  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  function handle(event, isCorrect) {
    event.preventDefault();
    if (isCorrect) {
      event.target.style.backgroundColor = "green";
      setTimeout(() => {
        event.target.style.backgroundColor = "white";
      }, 2000);
    }
    if (!isCorrect) {
      event.target.style.backgroundColor = "red";
      setTimeout(() => {
        event.target.style.backgroundColor = "white";
      }, 2000);
    }
  }

  function getClass(isCorrect) {
    if (!isCorrect) {
      return "answer";
    }
    return "answer-right";
  }
  var audio = new Audio();
  function handleClick(isCorrect, index) {
    if (isCorrect) {
      audio = new Audio("http://localhost:5000/audios/right-answer.mp3");
      audio.play();
      // setTimeout(() => {
      //   props.updateScore(props.score + 1);
      // }, 3500);
    } else {
      audio = new Audio("http://localhost:5000/audios/wrong-answer.wav");
      audio.play();
    }
    if (currentQuestion < answerOptions.length * 3 - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 2000);
    }
  }
  // setTimeout(() => {
  shuffle(data[0].answers);

  // }, 2000);
//   console.log(questions);
  console.log(answerOptions);

  return (
    <div>
      <div>
        <div className="question-container">
          <p className="question">{data[0].questions}</p>
        </div>

        <div className="answer-container">
          {data[0].answers.map((answer, index) => (
            <button
              // disabled={handleClick() ? true : false}
              className="answer"
              disabled={onclick ? true : false}
              // style={color(data[0].answers[index].isCorrect,index)}
              key={index}
              onClick={(event) => {
                handleClick(data[0].answers[index].isCorrect, index);
                handle(event, data[0].answers[index].isCorrect);
              }}
            >
              {answer.answer}
            </button>
          ))}
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default ImageQuestion;
