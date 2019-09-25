
import { combineReducers } from 'redux'


const defaultState = {
    initialProofId: null,
    proofs: [],
    sentences: [],
    justifications: [],
    currentGoal: null,
    currentFocus: null,
    proofCounter: null,
    sentenceCounter: null,
    justificationCounter: null,
    globalConstants: []
}


const insertBeforeIn = (inserted, before, array) => {
    const position = array.indexOf(before)
    return [...array.slice(0, position), inserted, ...array.slice(position, array.length)]
}


const handleInitialProofId = (state = defaultState.initialProofId, action) => {
    switch (action.type) {
        case "LOAD PROOF ID":
            return 1
        default:
            return state
    }
}

const handleProofs = (state = defaultState.proofs, action) => {
    switch (action.type) {
        case "LOAD PROOFS":
            return [{id: 1, children: action.children}]
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
        case "LOAD SENTENCES":
            return action.sentences
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
        case "LOAD JUSTIFICATIONS":
            const test = action.premises.map( (p, idx) => {return {id: idx + 1, type: "Premise", citationIds:[]}})
            console.log("test", test)
            return test
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
        case "LOAD PROOF COUNTER":
            return 1
        case "INCREMENT PROOF COUNTER":
            return state + 2
        default:
            return state
    }
}

const handleSentenceCounter = (state = defaultState.sentenceCounter, action) => {
    switch (action.type) {
        case "LOAD SENTENCE COUNTER":
            return action.counter
        case "INCREMENT SENTENCE COUNTER":
            return state + 2
        default:
            return state
    }
}

const handleJustificationCounter = (state = defaultState.justificationCounter, action) => {
    switch (action.type) {
        case "LOAD JUSTIFICATION COUNTER":
            return action.counter
        case "INCREMENT JUSTIFICATION COUNTER":
            return state + 1
        default:
            return state
    }
}

const handleGlobalConstants = (state = defaultState.globalConstants, action) => {
    switch (action.type) {
        case "LOAD GLOBAL CONSTANTS":
            return action.constants
        case "ADD CONSTANT":
            return [...state, action.newConstant]
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
    justificationCounter: handleJustificationCounter,
    globalConstants: handleGlobalConstants
})

export default rootReducer