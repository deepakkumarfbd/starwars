import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import {updateState} from "../action/action.js"

class Login extends React.Component {
    constructor(props){
        super(props);
        if(sessionStorage.getItem("loginState")) {
            props.history.push("/search");
        }

    }

    login = () => {
        axios.get(`https://swapi.co/api/people?search=${this.refs.username.value}`)
        .then((response) => {
            console.log(response);
            console.log(this.refs.password.value)
            if(response.data.results[0].birth_year === this.refs.password.value){
                console.log(this.props);
                sessionStorage.setItem("loginState", true)
                // this.props.updateState({loginState: true});
                this.props.history.push("/search");
            } else {
                console.log("credantiol not matched");
            }
  
        })
        .catch((error) => {
            console.log(error)
        })
    }
  

    render(){
        return (
            <div className="login-box">
                <h2>Login</h2>
                <input type="text" name="username"  ref="username" /><br />
                <input type="password" name="password" ref="password" /><br />
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loginState: state.loginState
})
const mapDispatchToProps = dispatch => ({
    updateState: obj => dispatch(updateState(obj))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);