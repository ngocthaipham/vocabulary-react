import React, { useEffect, useState } from "react";
import Level from "./levelApi";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faPenSquare,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const ShowLevelTable = (props) => {
  const [levelList, setLevelList] = useState([]);

  const { id } = useParams();

  useEffect(
    () =>
      Level.getLevelTable(id).then((response) => {
        setLevelList(response.data);
      }),
    []
  );

  const removeLevel = (id) => {
    Level.deleteLevel(id).then((response) => {
      alert("remove success");
      setLevelList(response.data);
    });
  };

  const showWord = (id) => {
    props.updateCurrentIdLevel(id);
  };

  return (
    <>
      <Link to={`/levels/${props.currentIdCourse}/addlevel`}>
        <button className="add-btn">
          <span className="text">Add a new level</span>
          <span className="add-icon">
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </button>
      </Link>

      <div>
        <div>
          <table border="0" cellPadding="0" cellSpacing="0">
            <thead className="header">
              <tr>
                <th>ID</th>
                <th>Level</th>
                <th>ID Source</th>
                <th>Actions</th>
                <th>
                  <Link to={"/"}>
                    <button className="back-btn">
                      <div className="outer">
                        <div className="inner">
                          <label className="back-btn-content">Back</label>
                        </div>
                      </div>
                    </button>
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {levelList.map((level) => (
                <tr key={level.idLevel}>
                  <td>{level.idLevel}</td>
                  <td>{level.level}</td>
                  <td>{level.idSource}</td>
                  <td>
                    <Link to={`/words/${level.idLevel}`}>
                      <button
                        className="view-btn"
                        onClick={() => {
                          showWord(level.idLevel);
                        }}
                      >
                        <div>
                          View <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                      </button>
                    </Link>
                    <Link
                      to={`/levels/${props.currentIdCourse}/editlevel/${level.idLevel}/${level.level}/${level.idSource}`}
                    >
                      <button className="edit-btn">
                        <div>
                          Edit <FontAwesomeIcon icon={faPenSquare} />
                          <div className="circle"></div>
                        </div>
                      </button>
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        removeLevel(level.idLevel);
                      }}
                    >
                      <span className="text">
                        Delete
                        <span className="trash-icon">
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ShowLevelTable;
