import React, { useState } from "react";
import Course from "./courseApi";
import { useHistory, useParams } from "react-router-dom";
import SaveButton from "../Button/SaveButton";
import CancelButton from "../Button/CancelButton";
import TextInput from "../Input/TextInput";
import ImageInput from "../Input/ImageInput";

const EditCourseForm = () => {
  const [newNameSource, setNewNameSource] = useState();
  const [newDesSource, setNewDesSource] = useState();
  const [newFileSelected, setNewFileSelected] = useState();
  const [previewImage, setPreviewImage] = useState();

  const { idSource, nameSource, desSource, userName, imageSource } =
    useParams();

  let history = useHistory();

  const updateCourse = (id) => {
    var data = new FormData();
    data.append("nameSource", newNameSource);
    data.append("desSource", newDesSource);
    data.append("imageSource", newFileSelected);
    Course.editCourse(id, data).then((response) => {
      alert(response.data);
      history.push(`/${userName}`);
    });
  };

  const updateFileSelected = (res) => {
    setNewFileSelected(res);
  };
  const updatePreviewImage = (res) => {
    setPreviewImage(res);
  };
  const updateNameSource = (res) => {
    setNewNameSource(res);
  };
  const updateDesSource = (res) => {
    setNewDesSource(res);
  };

  function cancel() {
    history.push(`/${userName}`);
  }

  return (
    <div>
      <div className="form-container">
        <h3 className="form-title">Edit Course</h3>
        <div className="form-wrapper">
          <div className="form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateCourse(idSource);
              }}
              encType="multipart/form-data"
            >
              <TextInput
                text={"New Name Course"}
                defaultValue={nameSource}
                onChange={updateNameSource}
              />
              <TextInput
                text={"New Description Course"}
                defaultValue={desSource}
                onChange={updateDesSource}
              />
              <label>
                {newFileSelected ? (
                  <ImageInput
                    setFileSelected={updateFileSelected}
                    setPreviewImage={updatePreviewImage}
                    previewImage={previewImage}
                  />
                ) : (
                  <ImageInput
                    setFileSelected={updateFileSelected}
                    setPreviewImage={updatePreviewImage}
                    previewImage={`http://localhost:5000/images/${imageSource}`}
                  />
                )}
              </label>
              <SaveButton />
              <CancelButton cancel={cancel} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourseForm;
