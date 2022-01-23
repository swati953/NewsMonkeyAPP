import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const Filter = () => {
    let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
    return (
        <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
        style={{ width: " 280px;" }}
      >
        <Link to="/ahome"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <i className="fas fa-user-cog bi me-2" width="40" height="32"></i>
          {/* <img className="bi me-2" width="40" height="32" /> */}
          <span className="fs-4">Welcome Admin</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link to="/ahome"  className={`nav-link ${
              location.pathname === "/ahome" ? "active" : "text-white"
            }`} aria-current="page">
              <i className="fas fa-store bi me-2" width="16" height="16"></i>
              All Item
            </Link>
          </li>
          <li>
            <Link to="/additem"  className={`nav-link ${
                location.pathname === "/additem" ? "active" : "text-white"
              }`}>
              <i className="fas fa-plus bi me-2" width="16" height="16"></i>
              Add New Item
            </Link>
          </li>
          <li>
            <Link to="/edit"  className={`nav-link ${
                location.pathname === "/edit" ? "active" : "text-white"
              }`}>
              <i className="fas fa-edit bi me-2" width="16" height="16"></i>
              Delete/Update Items
            </Link>
          </li>
        </ul>
        <hr />
      </div>
    )
}

export default Filter
