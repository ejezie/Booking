import React, {useState} from 'react'
import "./login.css"

function Login() {

    const [credential, setCredential] = useState({
        username: undefined,
        password: undefined,
    })
  return (
    <div>Login</div>
  )
}

export default Login