import Background from "./Background";
import React, { useEffect, useState } from "react";
import { Link, useHistory,useLocation } from "react-router-dom";

export default function Navbar(props) {
  let history = useHistory();
  const logout = async (e) => {
    e.preventDefault();
    console.log("item is there" + localStorage.getItem("token"));
    alert("You Login Out");
    localStorage.clear();
    history.push("/");
    console.log("item is not there" + localStorage.getItem("token"));
  };
  //using useLocation hook for navigate
  let location=useLocation();
  useEffect(() => {
    console.log(location.pathname);
  },[location])
  return (
    <div style={{ marginBottom: "5rem" }}>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            DailyHunt
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"?"active":""}`}  aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/business"?"active":""}`} to="/business">
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/entertainment"?"active":""}`} to="/entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/general"?"active":""}`} to="/general">
                  General
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/health"?"active":""}`} to="/health">
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/science"?"active":""}`} to="/science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/sports"?"active":""}`} to="/sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/technology"?"active":""}`} to="/technology">
                  Technology
                </Link>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  className={`nav-link ${location.pathname==="/login"|| location.pathname==="/signup"?"active":""}`}
                >
                  Login/Signup
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link class="dropdown-item"  to="/login">
                      Login
                    </Link>
                  </li>

                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/signup">
                      New User
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            
            
            <form class="d-flex">
              <Link class="btn btn-outline-warning" to="/savepost">
                Saved Post
              </Link>
              <button class="btn  btn-warning mx-2" onClick={logout}>
                Logout
              </button>
            </form>
            
          </div>
        </div>
      </nav>
    </div>
  );
}
