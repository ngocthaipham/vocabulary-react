import React, { useState } from "react";
import Course from "./courseApi";

const AddCourseForm = (props) => {
  const [idSource, setIdSource] = useState();
  const [nameSource, setNameSource] = useState("");
  const [desSource, setDesSource] = useState("");
  const [addState, setAddState] = useState(false);

  const showAddForm = () => {
    setAddState(true);
  };
  const hideAddForm = () => {
    setAddState(false);
  };

  const update = () => {
    Course.get()
    .then(response => {
        props.render(response.data)
    })
  }

  

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
  //   const initialCourseState = {
  //     idSource: "",
  //     nameSource: "",
  //     desSource: "",
  //   };
  //   const [course, setCourse] = useState(initialCourseState);
  //   const [addState, setAddState] = useState(false);
  //   //   const [idSource, setIdSource] = useState();
  //   //   const [nameSource, setNameSource] = useState("");
  //   //   const [desSource, setDesSource] = useState("");

  //   const handleInput = event => {
  //     const { name, value } = event.target;
  //     setCourse({ ...course, [name]: value });
  //   };

  //   const saveCourse = () => {
  //     var data = {
  //       idSource: course.idSource,
  //       nameSource: course.nameSource,
  //       desSource: course.desSource,
  //     };

  //     Course.addCourse(data).then((response) => {
  //       setCourse({
  //         idSource: response.data.idSource,
  //         nameSource: response.data.nameSource,
  //         desSource: response.data.desSource,
  //       });
  //     console.log(response.data)
  //     });
  //   };

  //   const newCourse = () => {
  //     setCourse(initialCourseState);
  //   };

  return (
    <div>
      {!addState ? (
        <button onClick={showAddForm} id="add-btn">
          Add a new course
        </button>
      ) : (
        <div id="add-course-form">
          <h3>Add course</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addCourse();
            }}
          >
            <label>ID</label>
            <input
              type="number"
              name="id"
              // value={course.idSource}
              onChange={(e) => {
                setIdSource(e.target.value);
              }}
            />
            <label>Name Source</label>
            <input
              type="text"
              name="name"
              // value={course.nameSource}
              onChange={(e) => {
                setNameSource(e.target.value);
              }}
            />
            <label>Description Source</label>
            <input
              type="text"
              name="des"
              // value={course.desSource}
              onChange={(e) => {
                setDesSource(e.target.value);
              }}
            />
            <button type="submit">Add new book</button>
            <button onClick={hideAddForm}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddCourseForm;
