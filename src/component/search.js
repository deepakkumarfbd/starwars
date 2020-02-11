import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { updateState } from "../action/action";

class Search extends React.Component {
    constructor(props){
        super(props);
        if(!sessionStorage.getItem("loginState")){
            this.props.history.push("/");
        }
    }

    getPlanets = e => {
        axios.get(`https://swapi.co/api/planets?search=${e.target.value}`)
        .then(response => {
            let results = response.data.results;
            results.sort((a,b) => (a.population === "unknown" ? -1 : a.population - b.population))  
            this.props.updateState({planetsList:results})
        })
        .catch(error => {
            console.log(error)
        })
    }

    logout = () => {
        sessionStorage.clear();
        this.props.history.push("/")
    }

    render(){
        return (
            <div className="login-box">
                <strong className="logout" onClick={this.logout}>Logout</strong>
                <h2>Search</h2>
                <input type="text" name="searchPlanets" onChange={e => this.getPlanets(e)} />
                {this.props.planetsList.map((item, index) => (
                    <div key={index} className="planet" style={{fontSize:`${11+index}px`}}>
                        <strong>Planet name : {item.name}</strong><br/>
                        <span>Population: {item.population}</span>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loginState: state.loginState,
    planetsList: state.planetsList
});

const mapDispatchToProps = dispatch => ({
    updateState: obj => dispatch(updateState(obj))
})


export default connect(mapStateToProps, mapDispatchToProps)(Search);