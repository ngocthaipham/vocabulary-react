import React, {useState, useEffect} from 'react'

const EditSourceForm = (props) => {  
    
    const [idSource, setIdSource] = useState(props.idSource)
    const [nameSource, setNameSource] = useState("nameSource")
    const [desSource, setDesSource] = useState("")

    
    const handleInput = event => {
        const {name, value} = event.target
        setBook({...book, [name]: value})
    }

return (
    <form
        onSubmit={event =>{
            event.preventDefault()
            props.updateBook(book.id, book)
        }}
>
    <label>Name</label>
    <input type="text" name="name" value={book.name} onChange={handleInput} />
    <button>Edit book</button>
    <button onClick={() => props.setEditBook(false)}>Cancel</button>
</form>
)
    }
export default EditBookForm ;