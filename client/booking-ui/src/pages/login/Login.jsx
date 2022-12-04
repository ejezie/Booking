import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({...prev, [e.target.id]: e.target.value }));
  }
  const handleClick = async (e) => {
    e.preventDefault()
    dispatch({tyoe: "LOGIN_START"})
    try{
        const res = await axios.post('auth/login', credentials)
        dispatch({type: "LOGIN_SUCCESS", payload: res.data})

    }catch(err){
        dispatch({type: "LOGIN_FAIL", payload: err.response.data})
    }
  }

  const {user, loading, error, dispatch} = useContext(AuthContext)
  console.log(user, "****", credentials.password)

  return <div className="login">
    <div className="lContainer">
        <h1>Welcome, please login</h1>
        <input placeholder="user name" id="username" type={"text"} onChange={handleChange} className="lInput"/>
        <input placeholder="password" id="password" type={"password"} onChange={handleChange} className="lInput"/>
        <button className="lButton" onClick={handleClick}>Login</button>
        {error && <span className="error">{error.message}</span>}
    </div>
  </div>;
}

export default Login;
