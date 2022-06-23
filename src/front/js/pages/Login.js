import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
    const {email, setEmail} = useState("");
    const {password, setPassword} = useState ("");
    const token = localStorage.getItem("token");
    console.log("this is your token", token)

    const handleClick = () => {
        const opts = {
            method: 'POST',
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify({
                "email": "test",
                "password": "test"
            })
        }
        fetch('https://3001-christianma-authenticat-bqvjyp1j1ff.ws-eu47.gitpod.io/api/token', opts)
        .then(resp => {
            if(resp.status === 200) return resp.json
            else alert("there's an error before the 200")
        })
        .then(data => {
            console.log("this came from the backend", data)
            localStorage.setItem("token", data.access_token);
        })
        
        .catch(error => {
            console.error("ERROR", error)
        })
    }
  return (
    <div className="text-center mt-5">
      <h1> Login</h1>
      {(token && token !="" & token !=undefined) ? "You're logged in with" + token:
      <div>
        <input type="text" placeholder="email" value = {email} onChange={(event) => setEmail(event.target.value)}/>
        <input type="password" placeholder="password" value = {password} onChange={(event) => setPassword(event.target.value)}/>
        <button onClick={handleClick}> Login </button>
      </div>
        }       
    </div>
  );
};
