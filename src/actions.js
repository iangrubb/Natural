
const fetchExercises = dispatch => {
    return ()=> {
        fetch("http://localhost:3000/categories")
        .then(resp => resp.json())
        .then(data => dispatch({type: "LOAD EXERCISE DATA", payload: data})
)
    }
}



export { fetchExercises }