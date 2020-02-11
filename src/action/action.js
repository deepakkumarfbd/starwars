import axios from "axios";

const updateState = payload => {
    return {
        type:"UPDATE_STATE",
        payload
    }
}

export const getApiData = e => {
    return dispatch => {
        dispatch(updateState({loader: true}))
        axios.get(`https://swapi.co/api/planets?search=${e.target.value}`)
        .then(response => {
            let results = response.data.results;
            results.sort((a,b) => (a.population === "unknown" ? -1 : a.population - b.population))  
            dispatch(updateState({planetsList:results, loader:false}))
        })
        .catch(error => {
            dispatch(updateState({error:error.message, loader:false}))
        })
    }
}


export const login = obj => {
    return dispatch => {
        dispatch(updateState({loader: true}))
        axios.get(`https://swapi.co/api/people?search=${obj.refs.username.value}`)
        .then(response => {
            if(response.data.results[0].birth_year === obj.refs.password.value && response.data.results[0].name.toLowerCase() === obj.refs.username.value.toLowerCase()){
                sessionStorage.setItem("loginState", true)
                obj.props.history.push("/search");
                dispatch(updateState({loader: false}))
            } else {
                dispatch(updateState({error: 'Credential not matched',loader:false}))
            }
        })
        .catch(error => {
            console.log(error)

            dispatch(updateState({error: error.message, loader:false}))
        })
    }
}
