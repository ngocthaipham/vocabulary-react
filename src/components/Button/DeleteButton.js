import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeleteButton = (props) => {
  return (
    <button
                    className="delete-btn"
                    onClick={() => {
                      props.remove(props.id);
                    }}
                  >
                    <span className="text">
                      Delete
                      <span className="trash-icon">
                        <FontAwesomeIcon icon={faTrash} />
                      </span>
                    </span>
                  </button>
  );
};
export default DeleteButton;