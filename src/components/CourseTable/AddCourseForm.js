import React, { useState } from "react";
import Course from "./courseApi";
import { useHistory, useParams } from "react-router-dom";
import "./AddCourseForm.css";
import SaveButton from "../Button/SaveButton";
import CancelButton from "../Button/CancelButton";
import TextInput from "../Input/TextInput";
import ImageInput from "../Input/ImageInput";
const AddCourseForm = () => {
  const [nameSource, setNameSource] = useState("");
  const [desSource, setDesSource] = useState("");
  const [fileSelected, setFileSelected] = useState();
  const [previewImage, setPreviewImage] = useState(
    "http://localhost:5000/images/image1627300361179.jpg"
  );

  let history = useHistory();
  const { userName } = useParams();
  const addCourse = () => {
    var data = new FormData();
    data.append("nameSource", nameSource);
    data.append("desSource", desSource);
    data.append("userName", userName);
    data.append("imageSource", fileSelected);
    Course.addCourse(data).then((response) => {
      alert(response.data);
      setPreviewImage("http://localhost:5000/images/image1627300361179.jpg");
      history.push(`/${userName}`);
    });
  };
  function cancel() {
    history.push(`/${userName}`);
    setPreviewImage("http://localhost:5000/images/image1627300361179.jpg");
  }

  const updateFileSelected = (res) => {
    setFileSelected(res);
  };
  const updatePreviewImage = (res) => {
    setPreviewImage(res);
  };
  const updateNameSource = (res) => {
    setNameSource(res);
  };
  const updateDesSource = (res) => {
    setDesSource(res);
  };

  return (
    <>
      <div>
        <div className="form-container">
          <h3 className="form-title">Add course</h3>
          <div className="form-wrapper">
            <div className="form">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addCourse();
                }}
                encType="multipart/form-data"
              >
                <TextInput
                  text={"Name Source"}
                  defaultValue={""}
                  onChange={updateNameSource}
                />

                <TextInput
                  text={"Description Source"}
                  defaultValue={""}
                  onChange={updateDesSource}
                />
                <ImageInput
                  setFileSelected={updateFileSelected}
                  setPreviewImage={updatePreviewImage}
                  previewImage={previewImage}
                />
        {/* <img className="image" src={previewImage}></img> */}

                <SaveButton />
                <CancelButton cancel={cancel} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourseForm;
