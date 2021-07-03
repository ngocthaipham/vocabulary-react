import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ShowCourseTable from "./components/CourseTable/ShowCourseTable";
import ShowLevelTable from "./components/LevelTable/ShowLevelTable";
import ShowWordTable from "./components/WordTable/ShowWordTable";
import "./App.css";
import Logo from "./asserts/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
function App() {
  const [levelList, setLevelList] = useState([]);
  const [wordList, setWordList] = useState([]);
  const [isShowLevelList, setIsShowLevelList] = useState(false);
  const [isShowWordList, setIsShowWordList] = useState(false);
  const [currentIdCourse, setCurrentIdCourse] = useState();
  const [currentIdLevel, setCurrentIdLevel] = useState();
  const [currentIdWord, setCurrentIdWord] = useState();

  const updateCurrentIdCourse = (res) => {
    setCurrentIdCourse(res);
  };

  const updateCurrentIdLevel = (res) => {
    setCurrentIdLevel(res);
  };

  const updateCurrentIdWord = (res) => {
    setCurrentIdWord(res);
  };

  const updateLevelList = (response) => {
    setLevelList(response);
  };
  const updateWordList = (response) => {
    setWordList(response);
  };

  const showLevelList = (res) => {
    setIsShowLevelList(res);
  };

  const showWordList = (res) => {
    setIsShowWordList(res);
  };

  return (
    <body>
      <Router>
        <div className="App">
          <a href="http://localhost:3000/">
            <img src={Logo} />
          </a>
          <h1>English Course</h1>
          <Switch>
            <Route exact path="/">
              <ShowCourseTable
                updateLevelList={updateLevelList}
                isShowLevelList={isShowLevelList}
                showLevelList={showLevelList}
                currentIdCourse={currentIdCourse}
                updateCurrentIdCourse={updateCurrentIdCourse}
              />
            </Route>
            {/* <Route exact path='/addcourse'>
      <AddCourseForm />
      </Route> */}
            {/* <Route exact path='/editcourse'>
        <EditCourseForm />
      </Route> */}
            <Route exact path="/levels/:id">
              <ShowLevelTable
                isShowLevelList={isShowLevelList}
                showLevelList={showLevelList}
                levelList={levelList}
                updateLevelList={updateLevelList}
                updateCurrentIdLevel={updateCurrentIdLevel}
                currentIdLevel={currentIdLevel}
                currentIdCourse={currentIdCourse}
                updateCurrentIdCourse={updateCurrentIdCourse}
                updateWordList={updateWordList}
                showWordList={showWordList}
              />
            </Route>
            <Route exact path="/words/:id">
              <ShowWordTable
                isShowWordList={isShowWordList}
                currentIdLevel={currentIdLevel}
                wordList={wordList}
                updateWordList={updateWordList}
                updateCurrentIdWord={updateCurrentIdWord}
                currentIdWord={currentIdWord}
                showWordList={showWordList}
                updateCurrentIdLevel={updateCurrentIdLevel}
              />
            </Route>
          </Switch>
        </div>
      </Router>
      <div className="footer">
        &copy; 2021 | <span>❤️ &nbsp;</span>
        <a href="https://github.com/ngocthaipham">Ngoc Thai</a>
      </div>
      <div class="social-links">
        <div class="social-btn flex-center" id="facebook">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <FontAwesomeIcon icon={faFacebook} />
          </svg>
          <span>
            <a href="https://www.facebook.com/marbiosgod/">NgocThai</a>
          </span>
        </div>
        <div class="social-btn flex-center" id="instagram">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <FontAwesomeIcon icon={faInstagram} />
          </svg>
          <span>
            <a href="https://www.instagram.com/pnthaiiii_/">@pnthaiiii_</a>
          </span>
        </div>
        <div class="social-btn flex-center" id="github">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <FontAwesomeIcon icon={faGithub} />
          </svg>
          <span>
            <a href="https://github.com/ngocthaipham">ngocthaipham99</a>
          </span>
        </div>
      </div>
    </body>
  );
}

export default App;
