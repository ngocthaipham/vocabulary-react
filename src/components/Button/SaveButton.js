import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const SaveButton = () => {
  return (
    <button className="submit-btn" type="submit">
    <span className="text">
      Save
      <span className="submit-icon">
        <FontAwesomeIcon icon={faCheck} />
      </span>
    </span>
  </button>
  );
};
export default SaveButton;