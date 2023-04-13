import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import logo from "../assets/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/home");
  }, [user, loading, navigate]);
  return (
    <div>
      <div className="logo_container">
        <img src={logo} alt="Cook Your Way Logo" className="logo-img"></img>
      </div>
      <div className="w-screen h-auto md:p-8 p-1 flex flex-col text-4xl font-bold mb-5 items-center justify-center">
        Cook Your Way
      </div>
      <div className="login">
        <div className="login__container">
          <input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="login__btn"
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Login
          </button>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
          <div>
            Don't want an account? <Link to="/home">Login as a guest</Link> now.
          </div>
        </div>
      </div>
    </div>

  );
}
export default Login;