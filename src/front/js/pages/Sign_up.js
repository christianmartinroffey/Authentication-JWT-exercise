import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

function Sign_up() {

    const { store, actions } = useContext(Context);
    const {email, setEmail} = useState("");
    const {password, setPassword} = useState ("");
    const token = localStorage.getItem("token");
    console.log("new user created", token)

    const handleClick = () => {
      // this needs changing from login to signup in flux.js - also needs an end point creating in routes.py
      actions.login(email, password);
  };

  return (
      <div className="text-center mt-5">
        <h1> Sign Up</h1>
      <div>
        <input type="text" placeholder="email" value = {email} onChange={(event) => setEmail(event.target.value)}/> 
        <input type="password" placeholder="password" value = {password} onChange={(event) => setPassword(event.target.value)}/>
        <button onClick={handleClick}> Submit </button>
      </div>    
    </div>
  )
}

export default Sign_up