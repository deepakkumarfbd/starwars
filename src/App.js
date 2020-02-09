import React from 'react';
import logo from './starwars_logo.png';
import Login from "./component/login.js";
import Search from "./component/search.js";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import { connect } from 'react-redux';
import {updateState} from "./action/action.js";

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" />
        </header>
        <BrowserRouter >
          <Switch>
              <Route exact path = "/" component = {Login} />
              <Route exact path = "/search" component = {Search} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateState: obj => dispatch(updateState(obj))
})

export default connect(null, mapDispatchToProps)(App);

