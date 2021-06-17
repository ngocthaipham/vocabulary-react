import React from 'react';
import AddSourceForm from './components/AddSource';
import SourceTable from './components/SourceTable';
import LevelTable from './components/LevelTable';
import WordTable from './components/WordTable';

function App() {
  return (
    <div className="App">
      <h2>Courses for English</h2>
      {/* <div>
        <AddSourceForm />
        </div> */}
      <div>
      <SourceTable />
      </div>
      <div>
      <LevelTable />
        </div>
        <WordTable />
      </div>
  );
}

export default App;
