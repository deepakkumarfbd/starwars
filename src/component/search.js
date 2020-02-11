import React from "react";
import { connect } from "react-redux";
import { getApiData } from "../action/action";
import loader from "../loader.gif"

class Search extends React.Component {
    constructor(props){
        super(props);
        if(!sessionStorage.getItem("loginState")){
            this.props.history.push("/");
        }
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
                <input type="text" name="searchPlanets" onChange={e => this.props.updateState(e)} />
                {this.props.planetsList.map((item, index) => (
                    <div key={index} className="planet" style={{fontSize:`${11+index}px`}}>
                        <strong>Planet name : {item.name}</strong><br/>
                        <span>Population: {item.population}</span>
                    </div>
                ))}
                {this.props.loader &&
                    <img src={loader} alt="loader" className="loader"/>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    planetsList: state.planetsList,
    loader:state.loader
});

const mapDispatchToProps = {
    updateState: obj => getApiData(obj)
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);