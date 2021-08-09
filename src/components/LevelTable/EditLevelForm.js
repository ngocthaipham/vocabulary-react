import Level from "./levelApi";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import SaveButton from "../Button/SaveButton";
import CancelButton from "../Button/CancelButton";
import TextInput from "../Input/TextInput";
import ImageInput from "../Input/ImageInput";

const EditLevelForm = () => {
  const [newLevel, setNewLevel] = useState("");
  const [newFileSelected, setNewFileSelected] = useState();
  const [previewImage, setPreviewImage] = useState();

  const { userName, idSource, idLevel, level, imageLevel } = useParams();

  let history = useHistory();

  const updateLevel = (id) => {
    var data = new FormData();
    data.append("level", newLevel);
    data.append("idSource", idSource);
    data.append("imageLevel", newFileSelected);

    Level.editLevel(id, data).then((response) => {
      alert(response.data);
      history.push(`/${userName}/levels/${idSource}`);
    });
  };

  function cancel() {
    history.push(`/${userName}/levels/${idSource}`);
  }

  const updateNewLevel = (res) => {
    setNewLevel(res);
  };

  const updateFileSelected = (res) => {
    setNewFileSelected(res);
  };
  const updatePreviewImage = (res) => {
    setPreviewImage(res);
  };

  return (
    <>
      <div className="form-container">
        <h3 className="form-title">Edit Level</h3>
        <div className="form-wrapper">
          <div className="form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateLevel(idLevel);
              }}
              encType="multipart/form-data"
            >
              <TextInput
                text={"New Level"}
                defaultValue={level}
                onChange={updateNewLevel}
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
                    previewImage={`http://localhost:5000/images/${imageLevel}`}
                  />
                )}
              </label>
              <SaveButton />
              <CancelButton cancel={cancel} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditLevelForm;
