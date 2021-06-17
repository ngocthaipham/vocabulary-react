import React , {useState, useEffect} from 'react';
import LevelTable from './LevelTable';

const SourceTable = () => {

  const [sourcesList, setSourcesList] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/sources')
      .then(response => response.json())
      .then(data => {
        setSourcesList(data);
      });
  },[])

  return (
    <>
    <table border="5" cellPadding ="5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name Source</th>
          <th>Description Source</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
          {sourcesList.map(source => (
              <tr key={source.idSource}>
              <td>{source.idSource}</td>
              <td>{source.nameSource}</td>
              <td>{source.desSource}</td>

          <td>
            <button
             className="view-button">View</button>
            <button 
             className="edit-button">Edit</button>
            <button 
            className="delete-button">Delete</button>
          </td>
        </tr>
          ))}
      </tbody>
    </table>
    </>
  )
};


  export default SourceTable ;