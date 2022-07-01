import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useHistory } from "react-router-dom";

export const Login = () => {
    const {store, actions } = useContext(Context);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState ();
    const token = localStorage.getItem("token");
    console.log("this is your token", token);
    const history = useHistory();

    const handleClick = () => {
        actions.login(email, password);
    };

    if(token && token != "" && token != undefined) history.push("/hello");
    
    return (
      <div className="text-center mt-5">
        <h1 className="mb-3"> Login</h1>
        {(token && token !="" & token !=undefined) ? "You're logged in with" + token:
        <div>
          <input type="text" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
          <input type="password" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
          <button onClick={handleClick}> Login </button>
        </div>
          } 
          <h4 className="mt-3"> Don't have an account yet? <a href= "/signup">Sign up here </a></h4>   
      </div>
    );
};
