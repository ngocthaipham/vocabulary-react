import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";

const EditButton = () => {
  return (
    // <div>
      <button className="edit-btn">
                      <div>
                        Edit <FontAwesomeIcon icon={faPenSquare} />
                        <div className="circle"></div>
                      </div>
                    </button>
    // </div>
  );
};
export default EditButton;