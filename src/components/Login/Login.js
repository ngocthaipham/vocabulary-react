import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

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
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <input
            type="text"
            placeholder="username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></input>
          <br />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          ></input>
          <button>login</button>
        </form>
      </div>

      <Link to="/">
        <button>Back</button>
      </Link>
    </>
  );
};
export default Login;
