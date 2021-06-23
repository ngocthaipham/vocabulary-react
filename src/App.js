import React from 'react';
import Table from './components/Table';
import LevelTable from './components/LevelTable';
import WordTable from './components/WordTable';

function App() {
  return (
    <div className="App">
      <h2>Courses for English</h2>
      <Table />
      <LevelTable />
      <WordTable />
      </div>
  );
}

export default App;
