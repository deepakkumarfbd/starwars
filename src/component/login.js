import React from "react";
import { connect } from "react-redux";
import {login} from "../action/action.js"
import loader from "../loader.gif"

class Login extends React.Component {
    constructor(props){
        super(props);
        if(sessionStorage.getItem("loginState")) {
            props.history.push("/search");
        }
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
                <button onClick={() => this.props.updateState(this)}>Login</button>
                {this.props.loader &&
                    <img src={loader} alt="loader" className="loader"/>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loginState: state.loginState,
    error: state.error,
    loader: state.loader
})
const mapDispatchToProps = {
    updateState: obj => login(obj)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);