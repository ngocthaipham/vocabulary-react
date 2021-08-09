import React from "react";
import { Link } from "react-router-dom";
import './Welcome.css'

const Welcome = () => {
  return (
    <>
    <h1 className='welcome-content'>LOGIN FOR MORE COURSES AND MORE FEATURES </h1>
     <div className='login-btn-wrapper-1'>
      <Link to={"/account/login"}>
        <button className='login-btn'>LOGIN</button>
      </Link>
      </div>
      <div class="text-center">
              <span className="txt1">Don’t have an account?</span>
              <Link to="/account/signup">
                <span className="txt2">Sign Up</span>
              </Link>
              </div>
    </>
  );
};
export default Welcome;
