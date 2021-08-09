import React from "react";

const ImageInput = (props) => {
  return (
    <>
      <label>
        {" "}
        Choose Your image :
        <input
          style={{ display: "none" }}
          type="file"
          name="image"
          onChange={(e) => {
            props.setFileSelected(e.target.files[0]);
            props.setPreviewImage(URL.createObjectURL(e.target.files[0]));
          }}
        />
        <img className="image" src={props.previewImage}></img>
      </label>
    </>
  );
};
export default ImageInput;
