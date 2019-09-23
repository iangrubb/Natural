
import { combineReducers } from 'redux'

// Direct proof test data

// const defaultState = {
//     initialProofId: 1,
//     proofs: [
//         {id: 1, children: [2, 4, 6]}
//     ],
//     sentences: [
//         {id: 2, content: {type:"conjunction", left: {type:"atom", letter:"B"}, right: {type:"atom", letter:"C"}} , justificationId: 1},
//         {id: 4, content: {type:"conditional", left: {type:"disjunction", left:{type:"atom", letter:"D"}, right:{type:"atom", letter:"C"}}, right: {type:"atom", letter:"A"}} , justificationId: 2},
//         {id: 6, content: {type:"conjunction", left: {type:"atom", letter:"A"}, right: {type:"atom", letter:"B"}} , justificationId: null}
//     ],
//     justifications: [
//         {id: 1, type:"Premise", citationIds:[]},
//         {id: 2, type:"Premise", citationIds:[]},
//     ],
//     currentGoal: 6,
//     currentFocus: null,
//     proofCounter: 1,
//     sentenceCounter: 6,
//     justificationCounter: 2
// }



// Conditional proof test data

// const defaultState = {
//     initialProofId: 1,
//     proofs: [
//         {id: 1, children: [2, 4]}
//     ],
//     sentences: [
//         {id: 2, content: {type:"conditional", left: {type:"conjunction", left:{type:"atom", letter:"A"}, right:{type:"atom", letter:"B"}}, right: {type:"atom", letter:"C"}} , justificationId: 1},
//         {id: 4, content: {type:"conditional", left: {type:"atom", letter:"A"} , right: {type:"conditional", left: {type:"atom", letter:"B"} , right: {type:"atom", letter:"C"}}}},
//     ],
//     justifications: [
//         {id: 1, type:"Premise", citationIds:[]},
//     ],
//     currentGoal: 4,
//     currentFocus: null,
//     proofCounter: 1,
//     sentenceCounter: 4,
//     justificationCounter: 1
// }

// OR ELIM Test Data

const defaultState = {
    initialProofId: 1,
    proofs: [
        {id: 1, children: [2, 4]}
    ],
    sentences: [
        {id: 2, content: {type:"disjunction", left: {type:"conjunction", left:{type:"atom", letter:"A"}, right:{type:"atom", letter:"B"}}, right: {type:"conjunction", left:{type:"atom", letter:"C"}, right:{type:"atom", letter:"D"}}} , justificationId: 1},
        {id: 4, content: {type:"disjunction", left: {type:"atom", letter:"A"} , right: {type:"atom", letter:"D"}}},
    ],
    justifications: [
        {id: 1, type:"Premise", citationIds:[]},
    ],
    currentGoal: 4,
    currentFocus: null,
    proofCounter: 1,
    sentenceCounter: 4,
    justificationCounter: 1
}






const insertBeforeIn = (inserted, before, array) => {
    const position = array.indexOf(before)
    return [...array.slice(0, position), inserted, ...array.slice(position, array.length)]
}



const handleInitialProofId = (state = defaultState.initialProofId, action) => {
    switch (action.type) {
        default:
            return state
    }
}

const handleProofs = (state = defaultState.proofs, action) => {
    switch (action.type) {
        case "ADD ELEMENT":
            return state.map( p => p.id === action.proofId ? {...p, children: insertBeforeIn(action.newId, action.goalId, p.children)} : p)
        case "NEW PROOF":
            return [...state, {id: action.id, children: action.children}]
        default:
            return state
    }
}

const handleSentences = (state = defaultState.sentences, action) => {

    switch (action.type) {
        case "NEW SENTENCE":
            return [...state, {id: action.id, content: action.content}]
        case "ADD JUSTIFICATION":
            return state.map( s => s.id === action.justifiedId ? {...s, justificationId: action.justificationId} : s)
        default:
            return state
    }
}

const handleJustifications = (state = defaultState.justifications, action) => {
    switch (action.type) {
        case "NEW JUSTIFICATION":
            return [...state, {id: action.id, type: action.ruleType, citationIds: action.citationIds} ]
        default:
            return state
    }
}

const handleCurrentGoal = (state = defaultState.currentGoal, action) => {
    switch (action.type) {
        case "SET GOAL":
            return action.newId
        case "UNSET GOAL":
            return null
        default:
            return state
    }
}

const handleCurrentFocus = (state = defaultState.currentFocus, action) => {
    switch (action.type) {
        case "SET FOCUS":
            return action.newId
        case "UNSET FOCUS":
            return null
        default:
            return state
    }
}

const handleProofCounter = (state = defaultState.proofCounter, action) => {
    switch (action.type) {
        case "INCREMENT PROOF COUNTER":
            return state + 2
        default:
            return state
    }
}

const handleSentenceCounter = (state = defaultState.sentenceCounter, action) => {
    switch (action.type) {
        case "INCREMENT SENTENCE COUNTER":
            return state + 2
        default:
            return state
    }
}

const handleJustificationCounter = (state = defaultState.justificationCounter, action) => {
    switch (action.type) {
        case "INCREMENT JUSTIFICATION COUNTER":
            return state + 1
        default:
            return state
    }
}


const rootReducer = combineReducers({
    initialProofId: handleInitialProofId,
    proofs: handleProofs,
    sentences: handleSentences,
    justifications: handleJustifications,
    currentGoal: handleCurrentGoal,
    currentFocus: handleCurrentFocus,
    proofCounter: handleProofCounter,
    sentenceCounter: handleSentenceCounter,
    justificationCounter: handleJustificationCounter
})

export default rootReducer