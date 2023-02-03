import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosApi } from "../api/axiosApi";
import { useActions } from "../hooks/useActions";

const Login = () => {
  // const [msg, setMsg] = useState("");
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const { setAccessToken } = useActions();
  const navigate = useNavigate();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axiosApi.post(
        "/login",
        {},
        {
          params: {
            email,
            password: pwd,
          },
        }
      );
      if (response.data.body?.status === "error" || response.data.status === "error") {
        throw new Error(`${response.data.body.message || response.data.status}`);
      }
      setAccessToken({ accessToken: response.data.body.access_token });
      localStorage.setItem("refreshToken", response.data.body.refresh_token);
      console.log(response);
      navigate("/me", { replace: true });
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <div className="login">
      {/* <h5 style={{ textAlign: "center" }}>{msg}</h5> */}
      <form className="login__form">
        <h2 className="login__title">Login</h2>
        <label>
          <span>Email</span>
          <input type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span>Password</span>
          <input type={"password"} value={pwd} onChange={(e) => setPwd(e.target.value)} />
        </label>
        <button onClick={handleLogin}>Login</button>
        <span style={{ margin: "1rem 0 0" }}>
          Have no account? <Link to={"/signup"}>Sign Up</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
