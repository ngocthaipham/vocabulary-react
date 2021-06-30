import React from 'react';
import ShowCourseTable from './components/CourseTable/ShowCourseTable'


function App() {
  return (
    <div className="App">
      <div>
      <a href='http://localhost:3000/'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7gRToWl9oRiNmfhMqUbqA0rLKXXhYnvYvTjQ8oMaziKpPZYIlgLGiEFt29wYm0bPPJjI&usqp=CAU' />
      </a>
      </div>
      <ShowCourseTable />
      </div>
  );
}

export default App;
