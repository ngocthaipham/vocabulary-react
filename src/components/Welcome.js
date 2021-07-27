import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <Link to={"/account/login"}>
        <button>login</button>
      </Link>
      <Link to={"account/signup"}>
        <button>Sign Up</button>
      </Link>
    </>
  );
};
export default Welcome;
