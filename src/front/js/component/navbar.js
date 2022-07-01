import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions, token } = useContext(Context);
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
    <Link to="/">
          <span className="navbar-brand mb-0 h1">Authentication Project</span>
        </Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
          <Link to="/">
            <span className="nav-link">Home Page</span>
          </Link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Menu
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to="/hello">
          			<span className="nav-link">Restricted</span>
        		  </Link>
              <li class="dropdown-divider"></li>
              <li>
                <div className="">
                  {!store.token ? (
                    <Link to="/signup">
                      <a className="nav-link">Sign Up</a>
                    </Link>
                  ) : (
                    <p>Logged in as {token}</p>
                  )}
                </div>
              </li>
              <li>
                <div className="">
                  {!store.token ? (
                    <Link to="/login">
                      <a className="nav-link">Login</a>
                    </Link>
                  ) : (
                    <a
                      className="nav-link"
                      onClick={() => actions.logout()}
                    >
                      Logout
                    </a>
                  )}
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
};
