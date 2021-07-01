import React, { useState } from "react";
import ShowCourseTable from "./components/CourseTable/ShowCourseTable";
import ShowLevelTable from "./components/LevelTable/ShowLevelTable";
import ShowWordTable from "./components/WordTable/ShowWordTable";
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
    <div className="App">
      <div>
        <a href="http://localhost:3000/">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7gRToWl9oRiNmfhMqUbqA0rLKXXhYnvYvTjQ8oMaziKpPZYIlgLGiEFt29wYm0bPPJjI&usqp=CAU" />
        </a>
      </div>
      <ShowCourseTable
        updateLevelList={updateLevelList}
        isShowLevelList={isShowLevelList}
        showLevelList={showLevelList}
        currentIdCourse={currentIdCourse}
        updateCurrentIdCourse={updateCurrentIdCourse}
      />
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
      <ShowWordTable
        isShowWordList={isShowWordList}
        currentIdLevel={currentIdLevel}
        wordList={wordList}
        updateWordList={updateWordList}
        updateCurrentIdWord={updateCurrentIdWord}
        currentIdWord={currentIdWord}
        showWordList={showWordList}
      />
    </div>
  );
}

export default App;
