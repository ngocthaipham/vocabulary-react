import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userYear, setUserYear] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const history = useHistory();
  const register = () => {
    if (repeatPassword !== userPassword) {
      alert("both password must match");
    }
    var data = {
      userName: userName,
      userEmail: userEmail,
      userYear: userYear,
      userPassword: userPassword,
    };
    Axios.post("http://localhost:5000/signup", data).then((response) => {
      alert(response.data);
      history.push(`/account/login`);
    });
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      >
        <label>Username : </label>
        <input
          type="text"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label>Email : </label>
        <input
          type="text"
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />{" "}
        <label>Year of birth : </label>
        <input
          type="number"
          onChange={(e) => {
            setUserYear(e.target.value);
          }}
        />
        <label>Password : </label>
        <input
          type="password"
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />{" "}
        <label>RepeatPassword : </label>
        <input
          type="password"
          onChange={(e) => {
            setRepeatPassword(e.target.value);
          }}
        />
        <button className="submit-btn" type="submit">
          Register
        </button>
      </form>
      <Link to="/">
        <button>Back</button>
      </Link>
    </>
  );
};
export default SignUp;
