import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import ShowCourseTable from "./components/CourseTable/ShowCourseTable";
import ShowLevelTable from "./components/LevelTable/ShowLevelTable";
import ShowWordTable from "./components/WordTable/ShowWordTable";
import AddCourseForm from "./components/CourseTable/AddCourseForm";
import AddLevelForm from "./components/LevelTable/AddLevelForm";
import AddWordForm from "./components/WordTable/AddWordForm";
import EditCourseForm from "./components/CourseTable/EditCourseForm";
import EditLevelForm from "./components/LevelTable/EditLevelForm";
import EditWordForm from "./components/WordTable/EditWordForm";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import SpeedReview from "./components/SpeedReview/SpeedReview";
import "./App.css";
import Logo from "./asserts/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
function App() {
  const [currentIdCourse, setCurrentIdCourse] = useState();
  const [currentIdLevel, setCurrentIdLevel] = useState();

  const updateCurrentIdCourse = (res) => {
    setCurrentIdCourse(res);
  };

  const updateCurrentIdLevel = (res) => {
    setCurrentIdLevel(res);
  };

  return (
    <body>
      <Router>
        <div className="header-container">
          <a href="http://localhost:3000/">
            <img className="logo" src={Logo} />
          </a>
        </div>
        <Switch>
          <div className="body-container">
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route exact path="/:userName">
              <ShowCourseTable
                currentIdCourse={currentIdCourse}
                updateCurrentIdCourse={updateCurrentIdCourse}
              />
            </Route>
            <Route exact path="/:userName/addcourse">
              <AddCourseForm />
            </Route>
            <Route
              exact
              path="/:userName/editcourse/:idSource/:nameSource/:desSource/:imageSource"
            >
              <EditCourseForm />
            </Route>
            <Route exact path="/:userName/levels/:idSource">
              <ShowLevelTable
                currentIdCourse={currentIdCourse}
                updateCurrentIdLevel={updateCurrentIdLevel}
              />
            </Route>
            <Route exact path="/:userName/levels/:idSource/addlevel">
              <AddLevelForm currentIdCourse={currentIdCourse} />
            </Route>
            <Route
              exact
              path="/:userName/levels/:idSource/editlevel/:idLevel/:level/:imageLevel"
            >
              <EditLevelForm currentIdCourse={currentIdCourse} />
            </Route>
            <Route exact path="/:userName/level/:idSource/words/:idLevel">
              <ShowWordTable
                currentIdLevel={currentIdLevel}
                currentIdCourse={currentIdCourse}
              />
            </Route>
            <Route
              exact
              path="/:userName/level/:idSource/words/:idLevel/addword"
            >
              <AddWordForm currentIdLevel={currentIdLevel} />
            </Route>
            <Route
              exact
              path="/:userName/level/:idSource/words/:idLevel/editword/:id/:vocab/:meaning/:imageWord/:audioWord"
            >
              <EditWordForm currentIdLevel={currentIdLevel} />
            </Route>
            <Route exact path="/:userName/level/:idSource/words/:idLevel/test">
              <SpeedReview />
            </Route>
            <Route exact path="/account/login">
              <Login />
            </Route>
            <Route exact path="/account/signup">
              <SignUp />
            </Route>
          </div>
        </Switch>
      </Router>
      <div className="footer-container">
        <div className="footer">
          &copy; 2021 | <span>❤️ &nbsp;</span>
          <a href="https://github.com/ngocthaipham">Ngoc Thai</a>
          <div className="social-links">
            <div className="social-btn flex-center" id="facebook">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <FontAwesomeIcon icon={faFacebook} />
              </svg>
              <span>
                <a href="https://www.facebook.com/marbiosgod/">NgocThai</a>
              </span>
            </div>
            <div className="social-btn flex-center" id="instagram">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <FontAwesomeIcon icon={faInstagram} />
              </svg>
              <span>
                <a href="https://www.instagram.com/pnthaiiii_/">@pnthaiiii_</a>
              </span>
            </div>
            <div className="social-btn flex-center" id="github">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <FontAwesomeIcon icon={faGithub} />
              </svg>
              <span>
                <a href="https://github.com/ngocthaipham">ngocthaipham99</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
