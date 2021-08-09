import React, { useState } from "react";
import Word from "./wordApi";
import { useHistory, useParams } from "react-router-dom";
import SaveButton from "../Button/SaveButton";
import CancelButton from "../Button/CancelButton";
import TextInput from "../Input/TextInput";
import ImageInput from "../Input/ImageInput";
import AudioInput from "../Input/AudioInput";

const EditWordForm = () => {
  const [newVocab, setNewVocab] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [newFileSelected, setNewFileSelected] = useState();
  const [newAudioSelected, setNewAudioSelected] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [previewAudio, setPreviewAudio] = useState();

  const {
    userName,
    idSource,
    idLevel,
    id,
    vocab,
    meaning,
    imageWord,
    audioWord,
  } = useParams();

  let history = useHistory();

  const updateWord = (id) => {
    var data = new FormData();
    data.append("idLevel", idLevel);
    data.append("vocab", newVocab);
    data.append("meaning", newMeaning);
    data.append("imageWord", newFileSelected);
    data.append("audioWord", newAudioSelected);
    Word.editWord(id, data).then((response) => {
      alert(response.data);
      history.push(`/${userName}/level/${idSource}/words/${idLevel}`);
    });
  };

  function cancel() {
    history.push(`/${userName}/level/${idSource}/words/${idLevel}`);
  }
  const updateVocab = (res) => {
    setNewVocab(res);
  };
  const updateMeaning = (res) => {
    setNewMeaning(res);
  };
  const updateFileSelected = (res) => {
    setNewFileSelected(res);
  };
  const updatePreviewImage = (res) => {
    setPreviewImage(res);
  };
  const updateAudioSelected = (res) => {
    setNewAudioSelected(res);
  };
  const updatePreviewAudio = (res) => {
    setPreviewAudio(res);
  };
  return (
    <>
      <div className="form-container">
        <h3 className="form-title">Edit Word</h3>
        <div className="form-wrapper">
          <div className="form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateWord(id);
              }}
              encType="multipart/form-data"
            >
              <TextInput
                text={"New Word"}
                defaultValue={vocab}
                onChange={updateVocab}
              />
              <TextInput
                text={"New Meaning"}
                defaultValue={meaning}
                onChange={updateMeaning}
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
                    previewImage={`http://localhost:5000/images/${imageWord}`}
                  />
                )}
              </label>
              <br />
              {newAudioSelected ? (
                <AudioInput
                  setAudioSelected={updateAudioSelected}
                  setPreviewAudio={updatePreviewAudio}
                  previewAudio={previewAudio}
                />
              ) : (
                <AudioInput
                  setAudioSelected={updateAudioSelected}
                  setPreviewAudio={updatePreviewAudio}
                  previewAudio={`http://localhost:5000/audios/${audioWord}`}
                />
              )}
              <br />
              <SaveButton />
              <CancelButton cancel={cancel} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditWordForm;
