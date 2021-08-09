import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddButton = (props) => {
  return (
    <button className="add-btn">
    <span className="text">{props.text}</span>
    <span className="add-icon">
      <FontAwesomeIcon icon={faPlus} />
    </span>
  </button>
  );
};
export default AddButton;