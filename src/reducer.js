
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
    globalConstants: [],
    stateRecord: [],
    stage: 0,
    maxStage: 0,
    sentenceChooser: {sentences:[] , callback:()=>console.log("TEST")}
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
        case "ADVANCE PROOFS":
            return action.value
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
        case "ADVANCE SENTENCES":
            return action.value
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
        case "ADVANCE JUSTIFICATIONS":
            return action.value
        case "LOAD JUSTIFICATIONS":
            const test = action.premises.map( (p, idx) => {return {id: idx + 1, type: "Premise", citationIds:[]}})
            return test
        case "NEW JUSTIFICATION":
            return [...state, {id: action.id, type: action.ruleType, citationIds: action.citationIds} ]
        default:
            return state
    }
}

const handleCurrentGoal = (state = defaultState.currentGoal, action) => {
    switch (action.type) {
        case "ADVANCE CURRENT GOAL":
            return action.value
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
        case "ADVANCE PROOF COUNTER":
            return action.value
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
        case "ADVANCE SENTENCE COUNTER":
            return action.value
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
        case "ADVANCE JUSTIFICATION COUNTER":
            return action.value
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
        case "ADVANCE GLOBAL CONSTANTS":
            return action.value
        case "LOAD GLOBAL CONSTANTS":
            return action.constants
        case "ADD CONSTANT":
            return [...state, action.newConstant]
        default:
            return state
    }
}

const handleStateRecord = (state = defaultState.stateRecord, action) => {
    switch (action.type) {
        case "DISCARD STAGES":
            return state.slice(0, action.finalStage)
        case "RECORD STATE":
            return [...state, {
                proofs: action.proofs,
                sentences: action.sentences,
                justifications: action.justifications,
                currentGoal: action.currentGoal,
                proofCounter: action.proofCounter,
                sentenceCounter: action.sentenceCounter,
                justificationCounter: action.justificationCounter,
                globalConstants: action.globalConstants,
            }]
        default:
            return state
    }
}

const handleStage = (state = defaultState.stage, action) => {
    switch (action.type) {
        case "SET STAGE":
            return action.stage
        default:
            return state
    }
}

const handleMaxStage = (state = defaultState.maxStage, action) => {
    switch (action.type) {
        case "SET MAX STAGE":
            return action.maxStage
        default:
            return state
    }
}

const handleSentenceChooser = (state = defaultState.sentenceChooser, action) => {
    switch (action.type) {
        case "SET SENTENCE CHOOSER":
            return {sentences: action.sentences , callback: action.callback}
        case "UNSET SENTENCE CHOOSER":
            return {sentences:[] , callback:()=>console.log("TEST")}
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
    globalConstants: handleGlobalConstants,
    stateRecord: handleStateRecord,
    stage: handleStage,
    maxStage: handleMaxStage,
    sentenceChooser: handleSentenceChooser
})

export default rootReducer