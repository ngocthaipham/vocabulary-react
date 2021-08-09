import React from "react";

const AudioInput = (props) => {
  return (
    <>
      <label>
        <img
          onClick={() => {
            var audio = new Audio(props.previewAudio);
            audio.play();
          }}
          className="audio-image"
          src="http://localhost:5000/images/audio.jpg"
        ></img>
      </label>
      <br />
      <label>
        {" "}
        Choose Your Audio
        <br />
        <input
          style={{ display: "none" }}
          type="file"
          name="audioWord"
          onChange={(e) => {
            props.setAudioSelected(e.target.files[0]);
            props.setPreviewAudio(URL.createObjectURL(e.target.files[0]));
          }}
        />
      </label>
    </>
  );
};
export default AudioInput;
