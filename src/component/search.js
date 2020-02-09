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
            this.props.updateState({planetsList:response.data.results})
        })
        .catch(error => {
            console.log(error)
        })
    }

    getFontSize = population => {
        if(population < 10000){
            return "10px"
        }else if(population < 50000){
            return "11px"
        }else if(population < 100000){
            return "12px"
        } else if (population < 1000000){
            return "13px"
        } else if(population < 5000000){
            return "14px"
        }else if(population < 10000000){
            return "15px"
        }else if(population < 50000000) {
            return "16px"
        }else if(population < 100000000) {
            return "17px"
        }else if(population < 200000000) {
            return "18px"
        }else if(population < 500000000) {
            return "19px"
        }else if(population < 1000000000) {
            return "20px"
        }else if(population < 5000000000) {
            return "21px"
        }else if(population < 10000000000) {
            return "22px"
        }else if(population < 50000000000) {
            return "23px"
        }else if(population < 100000000000) {
            return "24px"
        }else if(population < 500000000000) {
            return "25px"
        }else if(population < 10000000000000) {
            return "26px"
        }else if(population < 50000000000000) {
            return "27px"
        }else if(population < 100000000000000) {
            return "28px"
        }
    }

    render(){
        return (
            <div className="login-box">
                <h2>Search</h2>
                <input type="text" name="searchPlanets" onChange={e => this.getPlanets(e)} />
                {this.props.planetsList.map((item, index) => (
                    <div key={index} className="planet" style={{fontSize:this.getFontSize(item.population)}}>
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