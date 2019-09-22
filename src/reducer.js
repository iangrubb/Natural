
import { combineReducers } from 'redux'

const defaultState = {
    initialProofId: 1,
    proofs: [
        {id: 1, children: [2, 4, 6]}
    ],
    sentences: [
        {id: 2, content: {type:"conjunction", left: {type:"atom", letter:"B"}, right: {type:"atom", letter:"C"}} , justificationId: 1},
        {id: 4, content: {type:"conditional", left: {type:"disjunction", left:{type:"atom", letter:"D"}, right:{type:"atom", letter:"C"}}, right: {type:"atom", letter:"A"}} , justificationId: 2},
        {id: 6, content: {type:"conjunction", left: {type:"atom", letter:"A"}, right: {type:"atom", letter:"B"}} , justificationId: null}
    ],
    justifications: [
        {id: 1, type:"Premise", citationIds:[]},
        {id: 2, type:"Premise", citationIds:[]},
    ],
    currentGoal: 6
}



const handleInitialProofId = (state = defaultState.initialProofId, action) => {
    switch (action.type) {
        default:
            return state
    }
}

const handleProofs = (state = defaultState.proofs, action) => {
    switch (action.type) {
        default:
            return state
    }
}

const handleSentences = (state = defaultState.sentences, action) => {
    switch (action.type) {
        default:
            return state
    }
}

const handleJustifications = (state = defaultState.justifications, action) => {
    switch (action.type) {
        default:
            return state
    }
}

const handleCurrentGoal = (state = defaultState.currentGoal, action) => {
    switch (action.type) {
        default:
            return state
    }
}


const rootReducer = combineReducers({
    initialProofId: handleInitialProofId,
    proofs: handleProofs,
    sentences: handleSentences,
    justifications: handleJustifications,
    currentGoal: handleCurrentGoal
})

export default rootReducer