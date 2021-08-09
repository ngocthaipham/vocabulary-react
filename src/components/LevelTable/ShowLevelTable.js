import React, { useEffect, useState } from "react";
import Level from "./levelApi";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AddButton from "../Button/AddButton"
import ViewButton from "../Button/ViewButton";
import EditButton from "../Button/EditButton";
import DeleteButton from "../Button/DeleteButton";
import BackButton from "../Button/BackButton";

const ShowLevelTable = () => {
  const [levelList, setLevelList] = useState([]);
  const { userName, idSource } = useParams();

  useEffect(
    () =>
      Level.getLevelTable(idSource).then((response) => {
        setLevelList(response.data);
      }),
    []
  );

  const removeLevel = (id) => {
    Level.deleteLevel(id).then((response) => {
      alert("remove success");
      setLevelList(levelList.filter((level) => level.idLevel !== id));
    });
  };

  return (
    <>
      <h1>English Course</h1>

      <Link to={`/${userName}/levels/${idSource}/addlevel`}>
        <AddButton text={'Add a new level'} />
      </Link>
      <div className="back-btn-container">
        {" "}
        <Link to={`/${userName}`}>
         <BackButton text={'hello'} />
        </Link>
      </div>

      <div>
        <div>
          <table border="0" cellPadding="0" cellSpacing="0">
            <thead className="header">
              <tr>
                <th>Level</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {levelList.map((level) => (
                <tr key={level.idLevel}>
                  <td>{level.level}</td>
                  <td>
                    <img
                      className="image"
                      src={`http://localhost:5000/images/${level.imageLevel}`}
                    ></img>
                  </td>
                  <td>
                    <Link
                      to={`/${userName}/level/${idSource}/words/${level.idLevel}`}
                    >
                      <ViewButton />
                    </Link>
                    <Link
                      to={`/${userName}/levels/${idSource}/editlevel/${level.idLevel}/${level.level}/${level.imageLevel}`}
                    >
                      <EditButton />
                    </Link>
                    <DeleteButton remove={removeLevel} id={level.idLevel} />
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
