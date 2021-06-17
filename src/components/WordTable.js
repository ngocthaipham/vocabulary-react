import React , {useState, useEffect} from 'react';

const WordTable = () => {

  const [wordsList, setWordsList] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/sources/levels/words')
      .then(response => response.json())
      .then(data => {
        setWordsList(data);
      });
  },[])

  return (
    <>
    <table border="5" cellPadding ="5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Word</th>
          <th>Meaning</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
          {wordsList.map(word => (
              <tr key={word.id}>
              <td>{word.id}</td>
              <td>{word.vocab}</td>
              <td>{word.meaning}</td>

          <td>
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


  export default WordTable ;