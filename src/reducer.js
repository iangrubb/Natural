
import { combineReducers } from 'redux'

const defaultState = {
    initialProofId: 1,
    proofs: [
        {id: 1, children: [6, 2, 4], stageAdded: 1, orderAdded: 1}
    ],
    sentences: [
        {id: 2, content: {type:"conjunction", left: {type:"atom", letter:"A"}, right: {type:"atom", letter:"B"}} , justificationId: 1 , stageAdded: 1, orderAdded: 1},
        {id: 6, content: {type:"conjunction", left: {type:"atom", letter:"A"}, right: {type:"atom", letter:"B"}} , justificationId: 2 , stageAdded: 1, orderAdded: 2},
        {id: 4, content: {type:"atom", letter:"A"} , justificationId: null , stageAdded: 1, orderAdded: 3}
    ],
    justifications: [
        {id: 1, type:"Premise", citationIds:[], stageAdded: 1},
        {id: 2, type:"Premise", citationIds:[], stageAdded: 1}
    ],
    currentGoal: 4
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