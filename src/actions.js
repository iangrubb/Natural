

const URL = 'http://localhost:3000'


const fetchExercises = dispatch => {
    return ()=> {
        fetch(`${URL}/categories`)
        .then(resp => resp.json())
        .then(data => dispatch({type: "LOAD EXERCISE DATA", payload: data}))
    }
}

const signUpUser = dispatch => {
    return (username, password) => {
        const signupConfig = {
            method: "POST",
            body: JSON.stringify({username: username, password: password}),
            headers: {
                'content-type': "application/json",
                "accept": 'application/json'
            }
        }
        fetch(`${URL}/signup`, signupConfig)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            const processedProofs = data.data.attributes.proof_data.map( p => {
                return {
                    proofId: p.id,
                    type: p.type,
                    conclusion: JSON.parse(p.conclusion),
                    premises: p.premises.map( prem => JSON.parse(prem))
                }
            })
            dispatch({type: "LOAD USER INFO", username: data.data.attributes.username, proofs: processedProofs, successIds: data.data.attributes.success_ids})
        })

    }
}

const logInUser = dispatch => {
    return () => {


    }
}


const autoLogIn = dispatch => {
    return () => {


    }
}


export { fetchExercises, signUpUser, logInUser, autoLogIn }