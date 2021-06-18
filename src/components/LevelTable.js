import React , {useState, useEffect} from 'react';
import Axios from 'axios';

const LevelTable = () => {

const [levelsList, setLevelsList] = useState([]);

  // useEffect(()=>{
  //   fetch('http://localhost:5000/sources/levels')
  //     .then(response => response.json())
  //     .then(data => {
  //       setLevelsList(data);
  //     });
  // },[])
  const view = (id) => {
    Axios.get(`http://localhost:5000/sources/levels/${id}`)
    .then((response) => {
      setLevelsList(response.data)
      
    })
  }
  

  return (
    <>
    <table border="5" cellPadding ="5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Level</th>
          <th>ID Source</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
          {levelsList.map(level => (
            <tr key={level.idLevel}>
            <td>{level.idLevel}</td>
            <td>{level.level}</td>
            <td>{level.idSource}</td>
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


  export default LevelTable ;