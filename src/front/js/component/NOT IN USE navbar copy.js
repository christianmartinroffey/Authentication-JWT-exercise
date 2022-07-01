import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions, token } = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Home Page</span>
        </Link>
          <a
            class="nav-link dropdown-toggle"
            
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >Menu
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
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
            <li className="">
				<Link to="/hello">
          			<span className="navbar-brand">Hello page</span>
        		</Link>
			</li>
            <li>
              
            </li>
          </ul>

		<div className="">
                {!store.token ? (
                  <Link to="/login">
                    <button className="btn btn-primary">Login</button>
                  </Link>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => actions.logout()}
                  >
                    Logout
                  </button>
                )}
              </div>
      </div>
    </nav>
  );
};
