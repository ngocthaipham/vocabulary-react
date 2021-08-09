import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const ViewButton = () => {
  return (
    <button className="view-btn">
      <div>
        View <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </button>
  );
};
export default ViewButton;
