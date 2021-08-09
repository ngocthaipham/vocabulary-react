import React, { useState } from "react";
import Word from "./wordApi";
import { useHistory, useParams } from "react-router-dom";
import SaveButton from "../Button/SaveButton";
import CancelButton from "../Button/CancelButton";
import TextInput from "../Input/TextInput";
import ImageInput from "../Input/ImageInput";
import AudioInput from "../Input/AudioInput";

const AddWordFrom = () => {
  const [vocab, setVocab] = useState("");
  const [meaning, setMeaning] = useState("");
  const [fileSelected, setFileSelected] = useState();
  const [audioSelected, setAudioSelected] = useState();
  const [previewImage, setPreviewImage] = useState(
    "http://localhost:5000/images/image1627300361179.jpg"
  );
  const [previewAudio, setPreviewAudio] = useState();

  const { userName, idSource, idLevel } = useParams();

  let history = useHistory();

  const addWord = () => {
    var data = new FormData();
    data.append("idLevel", idLevel);
    data.append("vocab", vocab);
    data.append("meaning", meaning);
    data.append("imageWord", fileSelected);
    data.append("audioWord", audioSelected);
    Word.addWord(data).then((response) => {
      alert(response.data);
      setPreviewImage("http://localhost:5000/images/image1627300361179.jpg");
      setPreviewAudio();
      history.push(`/${userName}/level/${idSource}/words/${idLevel}`);
    });
  };

  function cancel() {
    history.push(`/${userName}/level/${idSource}/words/${idLevel}`);
    setPreviewImage("http://localhost:5000/images/image1627300361179.jpg");
    setPreviewAudio();
  }

  const updateVocab = (res) => {
    setVocab(res);
  };
  const updateMeaning = (res) => {
    setMeaning(res);
  };
  const updateFileSelected = (res) => {
    setFileSelected(res);
  };
  const updatePreviewImage = (res) => {
    setPreviewImage(res);
  };
  const updateAudioSelected = (res) => {
    setAudioSelected(res);
  };
  const updatePreviewAudio = (res) => {
    setPreviewAudio(res);
  };

  return (
    <>
      <div>
        <div className="form-container">
          <h3 className="form-title">Add Word</h3>
          <div className="form-wrapper">
            <div className="form">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addWord();
                }}
                encType="multipart/form-data"
              >
                <TextInput
                  text={"Word"}
                  defaultValue={""}
                  onChange={updateVocab}
                />
                <TextInput
                  text={"Meaning"}
                  defaultValue={""}
                  onChange={updateMeaning}
                />
                <ImageInput
                  setFileSelected={updateFileSelected}
                  setPreviewImage={updatePreviewImage}
                  previewImage={previewImage}
                />
                <br />
                <AudioInput
                  setAudioSelected={updateAudioSelected}
                  setPreviewAudio={updatePreviewAudio}
                  previewAudio={previewAudio}
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
export default AddWordFrom;
