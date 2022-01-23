import Background from "./Background";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function Sign(props) {
  let history = useHistory();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",

  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success)
    {   //redirect to notes or home screen
        localStorage.setItem('token',json.authtoken);
        
       // props.showAlert("Welcome Back user..","primary");
        history.push("/");
        }
    else
    {
        //props.showAlert("Please Login with the correct Email and Password","danger");
    }
    
  };
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div style={{maxWidth:"440px", padding:"0 20px", margin:"170px auto"}}>
      <div className="wrapper">
        <div className="title">
          <span>Welcome Back</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <i className="fas fa-user"></i>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={onchange}
              placeholder="Enter your Registered Email"
            />
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              minLength={5}
              required
              onChange={onchange}
              placeholder="Enter your Password"
            />
          </div>
          <div className="row button">
            <input type="submit" value="Login" />
          </div>
          <div className="signup-link">
            
            <Link to="/signup">New Member?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
