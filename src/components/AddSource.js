import React, {useState, useEffect} from 'react';
import Axios from 'axios';

const AddSourceForm = () => {
    const [idSource, setIdSource] = useState()
    const [nameSource, setNameSource] = useState("")
    const [desSource, setDesSource] = useState("")

  const  submit = () => {
      Axios.post("http://localhost:5000/sources", {
          idSource: idSource,
          nameSource: nameSource,
          desSource: desSource
      }).then(() => {
          console.log('success')
      })
    
}
    
    return (
        <div>
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
            <button type="submit">Add new book</button>
        </form>
        </div>
    )
}
export default AddSourceForm ;