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
            if(response.data.results[0].birth_year === this.refs.password.value && response.data.results[0].name.toLowerCase() === this.refs.username.value.toLowerCase()){
                sessionStorage.setItem("loginState", true)
                this.props.history.push("/search");
            } else {
                this.showError('Credential not matched')
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    showError = error => {
        this.props.updateState({error})
        this.setTimeout(() => {
            this.props.updateState({error:''})
        },2000)
    }
  

    render(){
        return (
            <div className="login-box">
                <h2>Login</h2>
                <input type="text" name="username"  ref="username" /><br />
                <input type="password" name="password" ref="password" /><br />
                {this.props.error &&
                    <span className="error">{this.props.error}</span>
                }
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loginState: state.loginState,
    error: state.error,
})
const mapDispatchToProps = dispatch => ({
    updateState: obj => dispatch(updateState(obj))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);