import React , {useState, useEffect} from 'react';
import Axios from 'axios';
import view from './LevelTable';




const Table = () => {

  const [sourcesList, setSourcesList] = useState([]);
  const [levelsList, setLevelsList] = useState([]);
  const [idSource, setIdSource] = useState();
  const [nameSource, setNameSource] = useState("");
  const [desSource, setDesSource] = useState("");


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

function myFunction(id) {
  var table = document.getElementById('course-table');
  var tr = document.getElementById(id)
  var length = tr.parentElement;
  console.log(tr, table)
  console.log(length)
  for (var i = 0; i < length.childNodes.length; i++) {
    if (length.childNodes[i].nodeType == 1) {
    length.childNodes[i].style.backgroundColor = "white"
}
tr.style.backgroundColor = "gray"
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
            <input type="text" name="new-des-source"  onChange={(e) => {
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
              <tr id={source.idSource} key={source.idSource}>
              <td id="id-source">{source.idSource}</td>
              <td id="name-source">{source.nameSource}</td>
              <td id="des-source">{source.desSource}</td>
          <td>
            <button  onClick={()=>{myFunction(source.idSource)}}
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

    </>
  )
};





  export default Table ;