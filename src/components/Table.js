import React , {useState, useEffect} from 'react';
import Axios from 'axios';


const Table = () => {

  const [sourcesList, setSourcesList] = useState([]);
  const [levelsList, setLevelsList] = useState([]);
  const [vocabList, setVocabList] = useState([]);
  const [idSource, setIdSource] = useState();
  const [nameSource, setNameSource] = useState("");
  const [desSource, setDesSource] = useState("");
  const [idLevel, setIdLevel] = useState();
  const [level, setLevel] = useState();
  const [id, setId] = useState();
  const [vocab, setVocab] = useState("");
  const [meaning, setMeaning] = useState("");



  useEffect(()=>{
    fetch('http://localhost:5000/sources')
      .then(response => response.json())
      .then(data => {
        setSourcesList(data);
      });
  },[])

//source table  
  const  submit = () => {
    Axios.post("http://localhost:5000/sources", {
        idSource: idSource,
        nameSource: nameSource,
        desSource: desSource
    }).then((response) => {
        alert('add success')
        setSourcesList(response.data)
    })
  
}
  const view = (id) => {
    Axios.get(`http://localhost:5000/levels/${id}`)
    .then((response) => {
      setLevelsList(response.data)
    })
    
  }

  const editSources = (id) => {
        Axios.put(`http://localhost:5000/sources/${id}`,{
        idSource: idSource,
        nameSource: nameSource,
        desSource: desSource
  }).then((response) => {
    alert('updated success')
    setSourcesList({...sourcesList})
  })
      }


  const deleteSource = (id) => {
    console.log(id)
    Axios.delete(`http://localhost:5000/sources/${id}`)
    .then(() => {
        alert('deleted')
      setSourcesList(sourcesList.filter(source => 
         source.id !== id 
      ))
    })
}

//level table

const viewVocab = (id) => {
  Axios.get(`http://localhost:5000/words/${id}`)
  .then((response) => {
    setVocabList(response.data)
    
  })
}

const addLevel = () => {
  Axios.post('http://localhost:5000/levels', {
      idLevel: idLevel,
      level: level,
      idSource: idSource,
  }).then(() => {
      console.log('success')
  })
}

const editLevel = (id) => {
  Axios.put(`http://localhost:5000/levels/${id}`,{
    idLevel: idLevel,
      level: level,
      idSource: idSource,
  }).then(() => {
      console.log('success')
  })
}

const deleteLevel = (id) => {
  Axios.delete(`http://localhost:5000/levels/${id}`)
  .then((response) => {
    setLevelsList(levelsList.filter((level) => {
      return level.idLevel !== id;
    }))
  })
}

// word table

const addWord = () => {
  Axios.post('http://localhost:5000/words', {
      id: id,
      idLevel: idLevel,
      vocab: vocab,
      meaning: meaning,
  }).then(() => {
      console.log('success')
  })
}

const editWord = (id) => {
  Axios.put(`http://localhost:5000/words/${id}`,{
    id: id,
    idLevel: idLevel,
    vocab: vocab,
    meaning: meaning,
  }).then(() => {
      console.log('success')
  })
}

const deleteWord = (id) => {
  Axios.delete(`http://localhost:5000/words/${id}`)
  .then((response) => {
    setVocabList(vocabList.filter((word) => {
      return word.id !== id;
    }))
  })
}

const showAddForm = () => {
  document.getElementById('add-course-form').style.display = 'block';
  document.getElementById('add-btn').style.display = 'none';
}

const cancelAddCourseForm = () => {
  document.getElementById('add-course-form').style.display = 'none';
  document.getElementById('add-btn').style.display = 'block';
}

const showUpdateCourseForm = (id) => {
  console.log(id)
  document.getElementById('update-course-form').style.display = 'block';
  document.getElementById('id-input').value = id;
  let disCourseView = document.querySelectorAll('.view-btn');
  let disCourseEdit = document.querySelectorAll('.edit-btn');
  let disCourseDelete = document.querySelectorAll('.delete-btn');

  for (let i = 0; i < disCourseView.length; i++) {
    disCourseView[i].disabled = true;
  }

  for (let i = 0; i < disCourseEdit.length; i++) {
    disCourseEdit[i].disabled = true;
  }

  for (let i = 0; i < disCourseDelete.length; i++) {
    disCourseDelete[i].disabled = true;
  }
}

const cancelUpdateCourseForm = () => {
  document.getElementById('update-course-form').style.display = 'none';
  document.getElementById('add-btn').style.display = 'block';
  let disCourseView = document.querySelectorAll('.view-btn');
  let disCourseEdit = document.querySelectorAll('.edit-btn');
  let disCourseDelete = document.querySelectorAll('.delete-btn');

  for (let i = 0; i < disCourseView.length; i++) {
    disCourseView[i].disabled = false;
  }

  for (let i = 0; i < disCourseEdit.length; i++) {
    disCourseEdit[i].disabled = false;
  }

  for (let i = 0; i < disCourseDelete.length; i++) {
    disCourseDelete[i].disabled = false;
  }
}



  return (
    <>  
    {/*source table*/}
    <button id='add-btn' onClick={() => {showAddForm()}}>Add a new course</button>
    <br/>
    <div id="add-course-form" style={{display: 'none'}}> 
      <h3>Add course</h3>
        <form onSubmit={(e)=>{
            e.preventDefault();
            submit();
        }}>
            <label>ID</label>
            <input type="number" name="id"  onChange={(e) => {
                setIdSource(e.target.value)
            }} />
            <label>Name Source</label>
            <input type="text" name="name"  onChange={(e) => {
                setNameSource(e.target.value) 
            }} />
            <label>Description Source</label>
            <input type="text" name="des"  onChange={(e) => {
                setDesSource(e.target.value) 
            }} />
            <button type="submit" onClick={() =>{cancelAddCourseForm()}}>Add new book</button>
            <button type="button" onClick={() => {cancelAddCourseForm()}}>Cancel</button>
        </form>
        </div>
        <br/>
        <div id="update-course-form" style={{display: 'none'}}>
        <form
        onSubmit={e =>{
            e.preventDefault()
            editSources(document.getElementById('id-input').value);
        }}>
            <label>ID</label>
            <input type="number" id="id-input" onChange={(e) => {
                setIdSource(e.target.value)
            }} />
            <label>New Name Source</label>
            <input type="text" id="new-name-source"  onChange={(e) => {
                setNameSource(e.target.value) 
            }} />
            <label>New Description Source</label>
            <input type="text" name="des"  onChange={(e) => {
                setDesSource(e.target.value) 
            }} />
    <button type="submit" onClick={()=>{cancelUpdateCourseForm()}}>Save</button> 
    <button type="button" onClick={() =>{cancelUpdateCourseForm()}}>Cancel</button>
        </form>

    </div>
        <br></br>
        <div>
    <table id="course-table" border="5" cellPadding ="5" >
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
              <tr id="course-row" key={source.idSource}>
              <td id="id-source">{source.idSource}</td>
              <td id="name-source">{source.nameSource}</td>
              <td>{source.desSource}</td>
          <td>
            <button  onClick={()=>{view(source.idSource)}}
             className="view-btn">View</button>
            <button onClick={()=>{showUpdateCourseForm(source.idSource)}}
             className="edit-btn">Edit</button>
            <button onClick={() => {deleteSource(source.idSource)}}
            className="delete-btn">Delete</button>
          </td>
        </tr>
          ))}
      </tbody>
    </table>
            </div>

{/* //level table */}
    {/* <div>
            <h3>Add level</h3>
        <form onSubmit={(e)=>{
            e.preventDefault();
            addLevel();
        }}>
            <label>ID</label>
            <input type="number" name="id"  onChange={(e) => {
                setIdLevel(e.target.value)
            }} />
            <label>Level</label>
            <input type="nunmber" name="level"  onChange={(e) => {
                setLevel(e.target.value) 
            }} />
            <label>ID Source</label>
            <input type="number" name="idsource"  onChange={(e) => {
                setIdSource(e.target.value) 
            }} />
            <button type="submit">Add level</button>
        </form>
        </div>

        <div>
        <form
        onSubmit={e =>{
            e.preventDefault()
            editLevel();
        }}>
        
            <br></br>
            <label>New level</label>
            <input type="number" name="name"  onChange={(e) => {
                setLevel(e.target.value) 
            }} />
            <br></br>
            <label>New ID Source</label>
            <input type="number" name="des" onChange={(e) => {
                setIdSource(e.target.value) 
            }} />
</form>
        </div>


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
            <button onClick={() =>{viewVocab(level.idLevel)}}
             className="view-button">View</button>
            <button onClick={() =>{editLevel(level.idLevel)}}
             className="edit-button">Edit</button>
            <button onClick={() =>{deleteLevel(level.idLevel)}}
            className="delete-button">Delete</button>
          </td>
        </tr>
          ))}
      </tbody>
    </table> */}

{/* //words table */}

{/* <div>
            <h3>Add word</h3>
        <form onSubmit={(e)=>{
            e.preventDefault();
            addWord();
        }}>
            <label>ID</label>
            <input type="number" name="id"  onChange={(e) => {
                setId(e.target.value)
            }} />
            <label>ID Level</label>
            <input type="number" name="id"  onChange={(e) => {
                setIdLevel(e.target.value)
            }} />
            <label>Word</label>
            <input type="text" name="word"  onChange={(e) => {
                setVocab(e.target.value) 
            }} />
            <label>Meaning</label>
            <input type="text" name="mean"  onChange={(e) => {
                setMeaning(e.target.value) 
            }} />
            <button type="submit">Add word</button>
        </form>
        </div>

        <div>
        <form
        onSubmit={e =>{
            e.preventDefault()
            editWord();
        }}>
        
            <br></br>
            <label>New ID level</label>
            <input type="number" name="id"  onChange={(e) => {
                setIdLevel(e.target.value) 
            }} />
            <br/>
            <label>New word</label>
            <input type="text" name="word"  onChange={(e) => {
                setVocab(e.target.value) 
            }} />
            <br></br>
            <label>New meaning</label>
            <input type="text" name="mean" onChange={(e) => {
                setMeaning(e.target.value) 
            }} />
</form>
        </div>

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
          {vocabList.map(word => (
              <tr key={word.id}>
              <td>{word.id}</td>
              <td>{word.vocab}</td>
              <td>{word.meaning}</td>

          <td>
            <button onClick={() =>{editWord(word.id)}}
             className="edit-button">Edit</button>
            <button onClick={() => {deleteWord(word.id)}}
            className="delete-button">Delete</button>
          </td>
        </tr>
          ))}
      </tbody>
    </table>


<button onClick={() =>
 Axios.get('http://localhost:5000/words')
 .then((response) => {
   setVocabList(response.data)
 }) }>show</button> */}

    </>
  )
};





  export default Table ;