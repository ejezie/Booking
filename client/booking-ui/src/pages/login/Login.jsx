import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/premitives/Button/Button";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({...prev, [e.target.id]: e.target.value }));
  }

  const {user, loading, error, dispatch} = useContext(AuthContext)

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch({type: "LOGIN_START"})
    console.log("clicked")
    try{
        const res = await axios.post('auth/login', credentials)
        dispatch({type: "LOGIN_SUCCESS", payload: res.data})
        navigate("/")
    }catch(err){
        dispatch({type: "LOGIN_FAIL", payload: err.response.data})
    }
  }

  console.log(user, credentials.username, credentials.password, loading)

  return <div className="login">
    <div className="lContainer">
        <h1>Welcome, please login</h1>
        <input placeholder="username" id="username" type={"text"} onChange={handleChange} className="lInput"/>
        <input placeholder="password" id="password" type={"password"} onChange={handleChange} className="lInput"/>
        <Button className="lButton" onClick={handleClick} title="Login" loading={loading}/>
        {error && <span className="error">{error.message}</span>}
    </div>
  </div>;
}

export default Login;
