import Level from "./levelApi";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import SaveButton from "../Button/SaveButton";
import CancelButton from "../Button/CancelButton";
import TextInput from "../Input/TextInput";
import ImageInput from "../Input/ImageInput";

const AddLevelForm = () => {
  const [level, setLevel] = useState("");
  const [fileSelected, setFileSelected] = useState();
  const [previewImage, setPreviewImage] = useState(
    "http://localhost:5000/images/image1627300361179.jpg"
  );

  const { userName, idSource } = useParams();

  let history = useHistory();

  const addLevel = () => {
    var data = new FormData();
    data.append("level", level);
    data.append("idSource", idSource);
    data.append("imageLevel", fileSelected);
    Level.addLevel(data).then((response) => {
      alert(response.data);
      setPreviewImage("http://localhost:5000/images/image1627300361179.jpg");
      history.push(`/${userName}/levels/${idSource}`);
    });
  };

  function cancel() {
    history.push(`/${userName}/levels/${idSource}`);
    setPreviewImage("http://localhost:5000/images/image1627300361179.jpg");
  }

  const updateLevel = (res) => {
    setLevel(res);
  };

  const updateFileSelected = (res) => {
    setFileSelected(res);
  };
  const updatePreviewImage = (res) => {
    setPreviewImage(res);
  };

  return (
    <>
      <div>
        <div className="form-container">
          <h3 className="form-title">Add Level</h3>
          <div className="form-wrapper">
            <div className="form">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addLevel();
                }}
                encType="multipart/form-data"
              >
                <TextInput
                  text={"Level"}
                  defaultValue={""}
                  onChange={updateLevel}
                />
                <ImageInput
                  setFileSelected={updateFileSelected}
                  setPreviewImage={updatePreviewImage}
                  previewImage={previewImage}
                />
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
export default AddLevelForm;
