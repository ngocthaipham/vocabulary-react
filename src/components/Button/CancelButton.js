import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CancelButton = (props) => {
  return (
    <button
    className="cancel-btn"
    onClick={props.cancel}
    >
    <span className="text">
      Cancel
      <span className="cancel-icon">
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </span>
  </button>
  );
};
export default CancelButton;