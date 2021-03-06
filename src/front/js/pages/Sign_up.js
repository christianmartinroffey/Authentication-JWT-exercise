import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useHistory } from "react-router-dom";


function Sign_up() {

    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState ("");
    const token = localStorage.getItem("token");
    console.log("new user created", token)
    const history = useHistory();
    
    const handleClick = () => {
      actions.newUser(email, password);
  };

  if(token && token != "" && token != undefined) history.push("/hello");
  
  return (
      <div className="text-center mt-5">
        <h1 className="mb-3"> Sign Up</h1>
      <div>
        <input type="text" placeholder="email" value = {email} onChange={(event) => setEmail(event.target.value)}/> 
        <input type="password" placeholder="password" value = {password} onChange={(event) => setPassword(event.target.value)}/>
        <button onClick={handleClick}> Submit </button>
      </div>   
      <h4 className="mt-3"> Already have an account? <a href= "/login"> Login through here </a></h4>  
    </div>
  )
}

export default Sign_up