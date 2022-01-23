import "./App.css";
import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Savednews from "./components/Savednews";
import NewsState from "./context/NewsState";
import Filter from "./components/Filter";

// require('dotenv').config();

export default class App extends Component {
  apikey = process.env.REACT_APP_API_KEY
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <NewsState>
        <div>

          <Router>

            <NavBar />
        {/* <Filter/> */}


            <LoadingBar
              color='#f11946'
              height={3}
              progress={this.state.progress}
            />
            <Switch>
              <Route exact path="/">
                <News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={5} country="in" category="general" />
              </Route>
              <Route exact path="/business">
                <News setProgress={this.setProgress} apikey={this.apikey} key="business" pageSize={5} country="in" category="business" />
              </Route>
              <Route exact path="/entertainment">
                <News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize={5} country="in" category="entertainment" />
              </Route>
              <Route exact path="/general">
                <News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={5} country="in" category="general" />
              </Route>
              <Route exact path="/health">
                <News setProgress={this.setProgress} apikey={this.apikey} key="health" pageSize={5} country="in" category="health" />
              </Route>
              <Route exact path="/science">
                <News setProgress={this.setProgress} apikey={this.apikey} key="science" pageSize={5} country="in" category="science" />
              </Route>
              <Route exact path="/sports">
                <News setProgress={this.setProgress} apikey={this.apikey} key="sports" pageSize={5} country="in" category="sports" />
              </Route>
              <Route exact path="/technology">
                <News setProgress={this.setProgress} apikey={this.apikey} key="technology" pageSize={5} country="in" category="technology" />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/savepost">
                <Savednews />
              </Route>
            </Switch>
          </Router>
        </div>
      </NewsState>
    );
  }
}
