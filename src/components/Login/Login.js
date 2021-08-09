import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const history = useHistory();

  const login = () => {
    var data = {
      userName: userName,
      userPassword: userPassword,
    };
    Axios.post("http://localhost:5000/login", data).then((response) => {
      setCookie("token", response.data, { path: "/" });
      history.push(`/${userName}`);
    });
  };

  return (
    <>
      <div className="container-login">
        <div className="login-wrapper">
          <div className="login-form">
            <p className="login-title">Welcome</p>
            <img
              className="login-logo"
              src={"http://localhost:5000/images/imageSource1627386479926.png"}
            ></img>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                login();
              }}
            >
              <input
                className="login-input"
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              ></input>
              <input
                className="login-input"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              ></input>
              <div className="login-btn-wrapper">
                <button className="login-btn">login</button>
              </div>
              <div className="login-btn-wrapper">
              <button className="login-btn"
                  onClick={() =>{history.push('/')}}>Back</button>
              </div>
            </form>
           
            
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
