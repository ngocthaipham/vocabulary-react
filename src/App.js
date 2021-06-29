import React from 'react';
import ShowCourseTable from './components/CourseTable/ShowCourseTable'
import ShowLevelTable from './components/LevelTable/ShowLevelTable'
import ShowWordTable from './components/WordTable/ShowWordTable'

function App() {
  return (
    <div className="App">
      <h2>Courses for English</h2>
      <ShowCourseTable />
      {/* <ShowLevelTable /> */}
      {/* <ShowWordTable /> */}
      </div>
  );
}

export default App;
