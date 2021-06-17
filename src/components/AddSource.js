import React, {useState, useEffect} from 'react';

const AddSourceForm = () => {
    const [idSource, setIdSource] = useState(10)
    const [nameSource, setNameSource] = useState("")
    const [desSource, setDesSource] = useState("")

  const  submit = useEffect(() => {
        fetch('http://localhost:5000/sources', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(),
    })
        .then(response => response.json())
        .then(data =>
            console.log('success', data));
}, []);

    return (
        <form >
            <label>ID</label>
            <input type="number" name="id" onChange={(e) => {
                setIdSource(e.target.value)
            }} />
            <label>Name Source</label>
            <input type="text" name="name" onChange={(e) => {
                setNameSource(e.target.value) 
            }} />
            <label>Description Source</label>
            <input type="text" name="des" onChange={(e) => {
                setDesSource(e.target.value) 
            }} />
            <button onClick={submit}>Add new book</button>
        </form>
    )
}
export default AddSourceForm ;