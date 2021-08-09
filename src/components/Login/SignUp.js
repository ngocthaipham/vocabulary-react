import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SignUp.css";
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
      <div className="container-sign-up">
        <div className="signup-wrapper">
          <div className="signup-form">
            <p className="signup-title">Welcome</p>
            <img
              className="signup-logo"
              src={"http://localhost:5000/images/imageSource1627386479926.png"}
            ></img>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                register();
              }}
            >
              <input
                className="signup-input"
                placeholder="Username"
                type="text"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <input
                placeholder="Email"
                className="signup-input"
                type="text"
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
              <input
                placeholder="Year of birth"
                className="signup-input"
                type="number"
                onChange={(e) => {
                  setUserYear(e.target.value);
                }}
              />
              <input
                placeholder="Password"
                className="signup-input"
                type="password"
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              />
              <input
                placeholder="Repeat Password"
                className="signup-input"
                type="password"
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                }}
              />
              <div className="signup-btn-wrapper">
                <button className="signup-btn" type="submit">
                  Register
                </button>
              </div>
              <div className="signup-btn-wrapper">
                  <button className="signup-btn"
                  onClick={() =>{history.push('/')}}>Back</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
