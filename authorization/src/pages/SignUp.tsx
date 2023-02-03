import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="signup">
      <form className="signup__form">
        <h2 className="signup__title">Sign Up</h2>
        <label>
          <span>Email</span>
          <input type={"email"} />
        </label>
        <label>
          <span>Password</span>
          <input type={"password"} />
        </label>
        <button>Sign Up</button>
        <span style={{ margin: "1rem 0 0" }}>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
