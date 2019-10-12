
import loadProof from './helpers/loadProof'

const URL = 'https://powerful-hamlet-69686.herokuapp.com'


const fetchExercises = dispatch => {
    return ()=> {
        fetch(`${URL}/categories`)
        .then(resp => resp.json())
        .then(data => dispatch({type: "LOAD EXERCISE DATA", payload: data}))
    }
}

const signUpUser = dispatch => {
    return (username, password, toggle) => {
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
            if (data.errors) {
                dispatch({type: "SET ERROR MESSAGE", message: data.errors})
            } else {
                toggle()
                localStorage.setItem('token', data.data.attributes.token)
                dispatch({type: "LOAD USER INFO", username: data.data.attributes.username, proofs: [], successIds: data.data.attributes.success_ids})
            }
        })
    }
}

const logInUser = dispatch => {
    return (username, password, toggle) => {
        const signupConfig = {
            method: "POST",
            body: JSON.stringify({username: username, password: password}),
            headers: {
                'content-type': "application/json",
                "accept": 'application/json'
            }
        }
        fetch(`${URL}/login`, signupConfig)
        .then(resp => resp.json())
        .then(data => {
            if (data.errors) {
                dispatch({type: "SET ERROR MESSAGE", message: data.errors})
            } else {
                const processedProofs = data.data.attributes.proof_data.map( p => {
                    return {
                        proofId: p.id,
                        type: p.type,
                        conclusion: p.conclusion,
                        premises: p.premises
                    }
                })
                localStorage.setItem('token', data.data.attributes.token)
                toggle()
                dispatch({type: "LOAD USER INFO", username: data.data.attributes.username, proofs: processedProofs, successIds: data.data.attributes.success_ids})
            }
        })
    }
}


const attemptAutoLogin = dispatch => {
    return token => {
        fetch(`${URL}/autologin`, {headers: {Authorization: token}, 'accept': 'application/json'})
        .then(resp => resp.json())
        .then(data => {
            if (!data.errors) {
                const processedProofs = data.data.attributes.proof_data.map( p => {
                    return {
                        proofId: p.id,
                        type: p.type,
                        conclusion: p.conclusion,
                        premises: p.premises
                    }
                })
                dispatch({type: "LOAD USER INFO", username: data.data.attributes.username, proofs: processedProofs, successIds: data.data.attributes.success_ids})
            }
        })


    }
}

const processProofSubmission = dispatch => {

    return (premises, conclusion, type, username, history, loggedIn) => () => {


        if (loggedIn) {

            const newProofConfig = {
                method: "POST",
                body: JSON.stringify({premises: premises, conclusion: conclusion, type: type, username: username}),
                headers: {
                    'content-type': "application/json",
                    "accept": 'application/json'
                }
            }
            fetch(`${URL}/proofs`, newProofConfig)
            .then(resp => resp.json())
            .then(data => {
                
                dispatch({type: "SAVE NEW PROOF", newProof: {proofId: parseInt(data.data.id), type: data.data.attributes.ptype , conclusion: data.data.attributes.conclusion, premises: data.data.attributes.premise_data} })
                loadProof(data.data.attributes.premise_data, data.data.attributes.conclusion, data.data.attributes.ptype , history, dispatch, parseInt(data.data.id))
            
            })
    
        } else {
            loadProof(premises, conclusion, type, history, dispatch, null)
        }
    }
}



const reportSuccess = (proofId, username) => {

    const successConfig = {
        method: "POST",
        body: JSON.stringify({username: username, proofId: proofId}),
        headers: {
            'content-type': "application/json",
            "accept": 'application/json'
        }
    }
    fetch(`${URL}/successes`, successConfig)
    .then(resp => resp.json())
    .then(data => console.log(data))
}


export { fetchExercises, signUpUser, logInUser, attemptAutoLogin, processProofSubmission, reportSuccess }