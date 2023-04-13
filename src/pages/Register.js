import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

import {
  auth,
  registerWithEmailAndPassword,
} from "./firebase";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
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
      <div className="register">
        <div className="register__container">
          <input
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="register__btn" onClick={register}>
            Register
          </button>
          <div>
            Already have an account? <Link to="/">Login</Link> now.
          </div>
          <div>
            Don't want an account? <Link to="/home">Login as a guest</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;