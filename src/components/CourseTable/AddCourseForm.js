import React, { useState } from "react";
import Course from "./courseApi";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
const AddCourseForm = (props) => {
  const [idSource, setIdSource] = useState();
  const [nameSource, setNameSource] = useState("");
  const [desSource, setDesSource] = useState("");
  const [addState, setAddState] = useState(false);

  const update = () => {
    Course.get().then((response) => {
      props.reRender(response.data);
    });
  };

  const addCourse = () => {
    var data = {
      idSource: idSource,
      nameSource: nameSource,
      desSource: desSource,
    };
    Course.addCourse(data).then((response) => {
      alert(response.data);
      setAddState(false);
      update();
    });
  };

  return (
    <>
      <div>
        {!addState ? (
          // <Link to={"/addcourse"}>
          <button className="add-btn"
          onClick={() => {
            setAddState(true);
          }}
          > <span className='text'>
          Add a new course<span className="add-icon">
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </span>
          </button>
          //  </Link>
        ) : (
          <div>
            <h3>Add course</h3>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                addCourse();
              }}
            >
              <label>ID : </label>
              <input
                type="number"
                onChange={(e) => {
                  setIdSource(e.target.value);
                }}
              />
              <label>Name Source : </label>
              <input
                type="text"
                onChange={(e) => {
                  setNameSource(e.target.value);
                  
                }}
              />
              <label>Description Source : </label>
              <input
                type="text"
                onChange={(e) => {
                  setDesSource(e.target.value);
                }}
              />
              {/* <Link to="/"> */}
                <button className="submit-btn"
                type="submit">
                  <span className="text">
                          Add
                          <span className="submit-icon">
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                        </span>
                </button>
              {/* </Link>
              <Link to={"/"}> */}
                <button className="cancel-btn"
                  onClick={() => {
                    setAddState(false);
                  }}
                >
                    <span className="text">
                          Cancel
                          <span className="cancel-icon">
                            <FontAwesomeIcon icon={faTimes} />
                          </span>
                        </span>
                </button>
              {/* </Link> */}
            </form>
          </div>
         )}
      </div>
    </>
  );
};

export default AddCourseForm;
