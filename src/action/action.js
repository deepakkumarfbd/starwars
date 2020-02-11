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
