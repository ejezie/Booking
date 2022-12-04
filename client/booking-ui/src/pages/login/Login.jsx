import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

function Login() {
  const [credentials, setCredential] = useState({
    username: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredential((prev) => ({...prev, [e.target.id]: e.target.value }));
  }
  const handleClick = async (e) => {
    e.preventDefault()
    dispatch({tyoe: "LOGIN_START"})
    try{
        const res = await axios.post('auth/login', credentials)
    }catch(err){
        dispatch({type: "LOGIN_FAIL", payload: err.response.data})
    }
  }

  const {loading, error, dispatch} = useContext(AuthContext)

  return <div className="login">
    <div className="loginWrap">
        <input placeholder="user name" id="username" type={"text"} onChange={handleChange} className="loginInput"/>
        <input placeholder="user name" id="password " type={"password"} onChange={handleChange} className="login Input"/>
        <button className="loginBut" onClick={handleClick}>Login</button>
        {error && <span className="error">{error.message}</span>}
    </div>
  </div>;
}

export default Login;
