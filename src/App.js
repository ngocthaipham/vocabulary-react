import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ShowCourseTable from "./components/CourseTable/ShowCourseTable";
import ShowLevelTable from "./components/LevelTable/ShowLevelTable";
import ShowWordTable from "./components/WordTable/ShowWordTable";
import AddCourseForm from "./components/CourseTable/AddCourseForm";
import AddLevelForm from "./components/LevelTable/AddLevelForm";
import AddWordForm from "./components/WordTable/AddWordForm";
import EditCourseForm from "./components/CourseTable/EditCourseForm";
import EditLevelForm from "./components/LevelTable/EditLevelForm";
import EditWordForm from "./components/WordTable/EditWordForm";
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
        <div className="App">
          <a href="http://localhost:3000/">
            <img src={Logo} />
          </a>
          <h1>English Course</h1>
          <Switch>
            <Route exact path="/">
              <ShowCourseTable
                currentIdCourse={currentIdCourse}
                updateCurrentIdCourse={updateCurrentIdCourse}
              />
            </Route>
            <Route exact path="/addcourse">
              <AddCourseForm />
            </Route>
            <Route exact path="/editcourse/:idSource/:nameSource/:desSource">
              <EditCourseForm />
            </Route>
            <Route exact path="/levels/:id">
              <ShowLevelTable
                currentIdCourse={currentIdCourse}
                updateCurrentIdLevel={updateCurrentIdLevel}
              />
            </Route>
            <Route exact path="/levels/:id/addlevel">
              <AddLevelForm currentIdCourse={currentIdCourse} />
            </Route>
            <Route exact path="/levels/:id/editlevel/:idLevel/:level/:idSource">
              <EditLevelForm currentIdCourse={currentIdCourse} />
            </Route>
            <Route exact path="/words/:id">
              <ShowWordTable
                currentIdLevel={currentIdLevel}
              />
            </Route>
            <Route exact path="/words/:id/addword">
              <AddWordForm currentIdLevel={currentIdLevel} />
            </Route>
            <Route
              exact
              path="/words/:id/editword/:id/:idLevel/:vocab/:meaning"
            >
              <EditWordForm currentIdLevel={currentIdLevel} />
            </Route>
          </Switch>
        </div>
      </Router>
      <div className="footer">
        &copy; 2021 | <span>❤️ &nbsp;</span>
        <a href="https://github.com/ngocthaipham">Ngoc Thai</a>
      </div>
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
    </body>
  );
}

export default App;
