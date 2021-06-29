import Level from "./levelApi";
import React, { useState} from "react";


const AddLevelForm = (props) => {

    const [idLevel, setIdLevel] = useState();
    const [level, setLevel] = useState("");
    const [idSource, setIdSource] = useState("");
    const [addState, setAddState] = useState(false);
  
    const showAddForm = () => {
        setAddState(true);
      };
      const hideAddForm = () => {
        setAddState(false);
      };

      const update = () => {
        Level.get()
        .then(response => {
            props.render(response.data)
        })
      } 
    

      const addLevel = () => {
          var data = {
              idLevel: idLevel,
              level: level,
              idSource: idSource,
          }

        Level.addLevel(data)
        .then(response =>{
            alert(response.data)
            setAddState(false)
            update();
        })
      }

  return (
    <>
    {!addState ? (
      <button onClick={showAddForm} 
      id="add-level-btn">Add a new level</button>
    ) : (
      <div id="add-level-form">
        <h3>Add level</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addLevel();
          }}
        >
          <label>ID</label>
          <input
            type="number"
            name="id-level"
            onChange={(e) => {
              setIdLevel(e.target.value);
            }}
          />
          <label>Level</label>
          <input
            type="number"
            name="level"
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          />
          <label>ID Source</label>
          <input
            type="number"
            name="id-source"
            onChange={(e) => {
              setIdSource(e.target.value);
            }}
          />
          <button type="submit">Add new level</button>
          <button onClick={hideAddForm}
          type="button">Cancel</button>
        </form>
      </div>
    )}
    </>
  );
};
export default AddLevelForm;