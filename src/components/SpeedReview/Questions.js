import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import "./SpeedReview.css";

const Question = () => {
  const [questionList, setQuestionList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [audioList, setAudioList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [showScore, setShowScore] = useState(false);
  const [questions, setQuestions] = useState({});
  const [score, setScore] = useState(0);
  const [answerOptions, setAnswerOptions] = useState({});
  const [imageQuestions, setImageQuestions] = useState({});
  const [audioQuestions, setAudioQuestions] = useState({});
  const [clicked, setClicked] = useState(false);
  const [randomNumber, setRandomNumber] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [i, setI] = useState(0);
  const history = useHistory();
  const { userName, idSource, idLevel } = useParams();

  const data = [
    {
      questions: <label className="question-content">{questions[0]}</label>,
      answers: [
        {
          id: 0,
          answer: answerOptions[answerList.length - questionList.length],
          isCorrect: true,
        },
        {
          id: 1,
          answer:
            answerOptions[
              random(9, 6, answerList.length - questionList.length)
            ],
          isCorrect: false,
        },
        {
          id: 2,
          answer:
            answerOptions[
              random(6, 3, answerList.length - questionList.length)
            ],
          isCorrect: false,
        },
        {
          id: 3,
          answer:
            answerOptions[
              random(3, 0, answerList.length - questionList.length)
            ],
          isCorrect: false,
        },
      ],
    },
    {
      questions: (
        <img
          className="image-question"
          src={`http://localhost:5000/images/${imageQuestions[0]}`}
        ></img>
      ),
      answers: [
        {
          id: 0,
          answer: answerOptions[answerList.length - imageList.length],
          isCorrect: true,
        },
        {
          id: 1,
          answer:
            answerOptions[random(9, 6, answerList.length - imageList.length)],
          isCorrect: false,
        },
        {
          id: 2,
          answer:
            answerOptions[random(6, 3, answerList.length - imageList.length)],
          isCorrect: false,
        },
        {
          id: 3,
          answer:
            answerOptions[random(3, 0, answerList.length - imageList.length)],
          isCorrect: false,
        },
      ],
    },
    {
      questions: (
        <div>
          <label>
            <audio style={{display: 'none'}} src={`http://localhost:5000/audios/${audioQuestions[0]}`} autoPlay></audio>
            <img
              onClick={() => {
                var audio = new Audio(
                  `http://localhost:5000/audios/${audioQuestions[0]}`
                );
                audio.play();
              }}
              className="audio-image"
              src="http://localhost:5000/images/audio.jpg"
            ></img>
          </label>
        </div>
      ),
      answers: [
        {
          id: 0,
          answer: answerOptions[answerList.length - audioList.length],
          isCorrect: true,
        },
        {
          id: 1,
          answer:
            answerOptions[random(9, 6, answerList.length - audioList.length)],
          isCorrect: false,
        },
        {
          id: 2,
          answer:
            answerOptions[random(6, 3, answerList.length - audioList.length)],
          isCorrect: false,
        },
        {
          id: 3,
          answer:
            answerOptions[random(3, 0, answerList.length - audioList.length)],
          isCorrect: false,
        },
      ],
    },
  ];
  useEffect(() => {
    Axios.get(`http://localhost:5000/vocabs/${idLevel}`).then((response) => {
      setQuestionList(response.data);
      setImageList(response.data);
      setAudioList(response.data);
      setAnswerList(response.data);
      //   if (seconds > 0) {
      //     setTimeout(() => setSeconds(seconds - 1), 1000);
      // } else {
      setCurrentQuestion(currentQuestion + 1);
      // }
    });
  }, []);
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  var timer;
  useEffect(() => {
    // setTimeout(() => { 

    setQuestions(questionList.map((question) => question.meaning));
    setImageQuestions(imageList.map((image) => image.imageWord));
    setAudioQuestions(audioList.map((audio) => audio.audioWord));
    setAnswerOptions(answerList.map((answer) => answer.vocab));
    console.log(currentQuestion)
    if (!clicked) {
      timer = setInterval(() => {
        handleClick();
        
      }, 7000);
    }
    return () => {
      if(!showScore) {

        clearInterval(timer);
      };
    }
  }, [currentQuestion]);

  // useEffect(() => {
  //   if(!clicked){
  //       timer = setInterval(() => {
  //             //  handleClick(false);
  //              setCurrentQuestion(currentQuestion + 1)
  //             }, 7000);}
  //        return () => {

  //        clearInterval(timer)}
  // },[])

  shuffleArray(data[i].answers);

  function random(max, min, number) {
    var i = Math.floor(Math.random() * (max - min) + min);
    if (i === number) {
      return random(max, min, number);
    }
    return i;
  }

  // function randomWithOutDuplicates(max, min) {
  //   var number = Math.floor(Math.random() * (max - min) + min);
  //   if (!arr.includes(number)) {
  //     arr.push(number);
  //     return number;
  //   } else {
  //     if (arr.length < max) {
  //       return randomWithOutDuplicates(max, min);
  //     }
  //   }
  // }
  //
  // var array = randomWithOutDuplicates(9, 0);
function highlight () {
  if(clicked) {
    
    return { 'background-color' : 'green' }
  } 
}
  var audio = new Audio();
  function handleClick(isCorrect, index) {
    console.log('hi')
    if (isCorrect) {
      audio = new Audio("http://localhost:5000/audios/right-answer.mp3");
      audio.play();
      setTimeout(() => {
        setClicked(true);

        setScore(score + 1);
      }, 2000);
    } else {
      audio = new Audio("http://localhost:5000/audios/wrong-answer.wav");
      audio.play();
      setTimeout(() => {
        
        setClicked(true);
        setSeconds(seconds+1)
      }, 2000);
    }
    if (seconds===2) {
      setShowScore(true);
    } else if (currentQuestion < answerList.length * 3 - 1) {
      setTimeout(() => {
        setClicked(false);
      }, 2000);
      switch (i) {
        case 0: {
          console.log(questionList);

          if (questionList.length > 1) {
            setTimeout(() => {
              setQuestionList(
                questionList.filter((image) => image !== questionList[0])
              );
              //  setRandomNumber(Math.floor(Math.random() * (9)))
              setRandomNumber(random(9, 0));

              setCurrentQuestion(currentQuestion + 1);
              setI(random(3, 0));
              // setColor(false)
            }, 2000);
          } else if (imageList.length > 1 && audioList.length > 1) {
            setTimeout(() => {
              setI(random(3, 1, 0));
            }, 2000);
          } else if (imageList.length > 1) {
            setTimeout(() => {
              setI(1);
            }, 2000);
          } else if (audioList.length > 1) {
            setTimeout(() => {
              setI(2);
            }, 2000);
          } else {
            setTimeout(() => {
              setShowScore(true);
            }, 5000);
          }
          // } else {
          //   setTimeout(() => {
          //     setShowScore(true);
          //   }, 2000);
          // }
          break;
        }
        case 1: {
          if (imageList.length > 1) {
            // if (currentQuestion < (imageQuestions.length*3) - 1 ) {
            // imageQuestions.shift();
            // console.log(audioQuestions)
            setTimeout(() => {
              setImageList(imageList.filter((image) => image !== imageList[0]));
              //  setRandomNumber(Math.floor(Math.random() * (9)))
              setRandomNumber(random(9, 0));

              setCurrentQuestion(currentQuestion + 1);
              setI(random(3, 0));
              // setColor(false)
              console.log(imageQuestions);
            }, 2000);
          } else if (imageList.length > 1 && audioList.length > 1) {
            setTimeout(() => {
              setI(random(3, 0, 1));
            }, 2000);
          } else if (questionList.length > 1) {
            setTimeout(() => {
              setI(0);
            }, 2000);
          } else if (audioList.length > 1) {
            setTimeout(() => {
              setI(2);
            }, 2000);
          } else {
            setTimeout(() => {
              setShowScore(true);
            }, 5000);
          }
          // } else {
          //   setTimeout(() => {
          //     setShowScore(true);
          //   }, 3500);
          // }
          break;
        }
        case 2: {
          if (audioList.length > 1) {
            // if (currentQuestion < (audioQuestions.length)*3 -1 ) {
            // audioList.shift();
            setTimeout(() => {
              setAudioList(audioList.filter((image) => image !== audioList[0]));
              //  setRandomNumber(Math.floor(Math.random() * (9)))
              setRandomNumber(random(9, 0));

              setCurrentQuestion(currentQuestion + 1);
              setI(random(3, 0));
              console.log(audioQuestions);
            }, 3500);
          } else if (imageList.length > 1 && audioList.length > 1) {
            setTimeout(() => {
              setI(random(2, 0, 2));
            }, 3500);
          } else if (imageList.length > 1) {
            setTimeout(() => {
              setI(1);
            }, 3500);
          } else if (questionList.length > 1) {
            setTimeout(() => {
              setI(0);
            }, 3500);
          } else {
            setTimeout(() => {
              setShowScore(true);
            }, 5000);
          }
          break;
        }
      }
    } else {
      setTimeout(() => {
        setShowScore(true);
      }, 3500);
    }

    // if (currentQuestion < questionList.length * 3 - 1) {
    //   questionList.shift();
    //   setTimeout(() => {
    //     //  setRandomNumber(Math.floor(Math.random() * (9)))
    //     setRandomNumber(random(9, 0));
    //     setCurrentQuestion(currentQuestion + 1);
    //     // setColor(false)
    //   }, 3500);
    // } else {
    //   setTimeout(() => {
    //     setShowScore(true);
    //   }, 3500);
    // }

    // console.log(data[0]);
    // console.log(questions);
  }
  function handle() {
    setClicked(true);
  }
  // console.log(currentQuestion);

  return (
    <>
      <div>
        {showScore ? (
          <div>
            You answer correct {score} out of {answerList.length * 3}
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
          <div>
            <div className="question-container">
              <p className="question">{data[i].questions}</p>
            </div>

            <div className="answer-container">
              {data[i].answers.map((answer, index) => (
                <button
                  className="answer"
                  // disabled={selected}
                  style={highlight()}
                  key={index}
                  onClick={() => {
                    handleClick(data[i].answers[index].isCorrect, index);
                    handle();
                  }}
                >
                  <p className="answer-content">{answer.answer}</p>
                </button>
              ))}
              <div></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Question;
