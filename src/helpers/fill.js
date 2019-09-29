


import sentenceEquality from '../helpers/sentenceEquality'
import substitute from '../helpers/substitute'
import findAbove from '../helpers/findAbove'

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w']

const fill = (state, goalSentence, focusSentence, options, dispatch) => {


    if (state.stage < state.maxStage) {
        dispatch({type: "DISCARD STAGES", finalStage: state.stage + 1})
    }

    // Record Old State

    if (state.maxStage === state.stateRecord.length) {
        dispatch({
            type: "RECORD STATE",
            proofs: state.proofs,
            sentences: state.sentences,
            justifications: state.justifications,
            currentGoal: state.currentGoal,
            proofCounter: state.proofCounter,
            sentenceCounter: state.sentenceCounter,
            justificationCounter: state.justificationCounter,
            globalConstants: state.globalConstants,
        })
    }


    dispatch({type: "SET STAGE", stage: state.stage + 1})
    dispatch({type: "SET MAX STAGE", maxStage: state.stage + 1})

    // ID Auto-incrementation

    const sentenceId = (() => {
        let current = state.sentenceCounter
        return ()=>{
            current += 2
            dispatch({type: "INCREMENT SENTENCE COUNTER"})
            return current
        }
    })()

    const proofId = (() => {
        let current = state.proofCounter
        return ()=>{
            current += 2
            dispatch({type: "INCREMENT PROOF COUNTER"})
            return current
        }
    })()

    const justificationId = (() => {
        let current = state.justificationCounter
        return ()=>{
            current += 1
            dispatch({type: "INCREMENT JUSTIFICATION COUNTER"})
            return current
        }
    })()

    // Element Makers (these return id of the thing made)

    const newSentence = (content, goalId, proofId, dispatch) => {

        const newId = sentenceId()

        dispatch({type: "NEW SENTENCE", id: newId, content: content})
        dispatch({type: "ADD ELEMENT", proofId: proofId, newId: newId, goalId: goalId})
    
        return newId
    }
    
    const newJustification = (justifiedId, ruleType, citationIds, dispatch) => {

        const newId = justificationId()

        dispatch({type:"NEW JUSTIFICATION", id: newId, ruleType: ruleType, citationIds: citationIds })
        dispatch({type:"ADD JUSTIFICATION", justificationId: newId, justifiedId: justifiedId})

        return newId
    }
    
    const newProof = (assumption, goal, goalId, parentProofId, dispatch) => {

        const newId = proofId()

        const assumptionId = sentenceId()
        dispatch({type:"NEW SENTENCE", id: assumptionId, content: assumption})
        newJustification(assumptionId, "Assumption", [], dispatch)

        const subGoalId = sentenceId()
        dispatch({type:"NEW SENTENCE", id: subGoalId, content: goal})

        dispatch({type:"NEW PROOF", id: newId, children: [assumptionId, subGoalId] })

        dispatch({type: "ADD ELEMENT", proofId: parentProofId, newId: newId, goalId: goalId})

        return { main: newId, sub: subGoalId }
    }

    const setNextGoal = provenId => {
        const initialGoals = state.sentences.filter( s => !s.justificationId)
        const nextGoalId = initialGoals.find( g => g.id !== provenId)
        if (nextGoalId) {
            dispatch({type: "SET GOAL", newId: nextGoalId.id})
        } else {
            dispatch({type: "UNSET GOAL"})
        }
    }


    


    // Proof Rule Cases
    const parentId = state.proofs.find( p => p.children.includes(goalSentence.id)).id

    if (options.lemma) {

        const lemma = newSentence(options.lemma, goalSentence.id, parentId, dispatch)
        dispatch({type: "SET GOAL", newId: lemma})

    
    } else if (goalSentence.id === focusSentence.id) {
        // Intro Rules
        switch(options.rule) {
            case "dne":
                const dnId = newSentence({type:"negation", right:{type:"negation", right: focusSentence.content}}, goalSentence.id, parentId, dispatch)
                newJustification(goalSentence.id, "DNE", [dnId], dispatch)
                dispatch({type: "SET GOAL", newId: dnId})
                break
            case "reit":
                const foundCopy = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content) && findAbove(goalSentence.id, s.id, state.proofs))

                if (foundCopy) {
                    newJustification(goalSentence.id, "Reiteration", [foundCopy.id], dispatch)
                    setNextGoal(goalSentence.id)
                }

                break
            case "exp":
                const expId = newSentence({type:"contradiction"}, goalSentence.id, parentId, dispatch)
                newJustification(goalSentence.id, "Explosion", [expId], dispatch)
                dispatch({type: "SET GOAL", newId: expId})
                break
            case "canon":
                switch(focusSentence.content.type) {
                    case "conjunction":
                        let leftId
                        let rightId
                        if (options.foundLeft) {
                            leftId = options.foundLeft.id
                        } else {
                            leftId = newSentence(focusSentence.content.left, goalSentence.id, parentId, dispatch)
                        }
                        if (options.foundRight) {
                            rightId = options.foundRight.id
                        } else {
                            rightId = newSentence(focusSentence.content.right, goalSentence.id, parentId, dispatch)
                        }

                        newJustification(goalSentence.id, "&i", [leftId, rightId], dispatch)

                        if (!options.foundLeft) {
                            dispatch({type: "SET GOAL", newId: leftId})
                        } else if (!options.foundRight) {
                            dispatch({type: "SET GOAL", newId: rightId})
                        } else {
                            setNextGoal(goalSentence.id)
                        }
                        
                        break
                    case "disjunction":
                        if (options.found) {
                            newJustification(goalSentence.id, "∨i", [options.found.id], dispatch)
                            setNextGoal(goalSentence.id)
                        } else {
                            const disId = newSentence(focusSentence.content[options.side], goalSentence.id, parentId, dispatch)
                            newJustification(goalSentence.id, "∨i", [disId], dispatch)
                            dispatch({type: "SET GOAL", newId: disId})
                        }
                        break
                    case "conditional":
                        const goalIds = newProof(focusSentence.content.left, focusSentence.content.right, goalSentence.id, parentId, dispatch)
                        newJustification(goalSentence.id, "→i", [goalIds.main], dispatch)
                        dispatch({type: "SET GOAL", newId: goalIds.sub})
                        break
                    case "negation":
                        const Ids = newProof(focusSentence.content.right, {type: "contradiction"}, goalSentence.id, parentId, dispatch)
                        newJustification(goalSentence.id, "¬i", [Ids.main], dispatch)
                        dispatch({type: "SET GOAL", newId: Ids.sub})
                        break
                    case "contradiction":
                        
                        const chosenSentence = state.sentences.find( s => s.id === options.chosenId)

                        let oppositeContent

                        if (chosenSentence.content.type === "negation") {
                            oppositeContent = chosenSentence.content.right
                        } else {
                            oppositeContent = {type: "negation", right: chosenSentence.content}
                        }

                        const foundOpposite = state.sentences.find( s => sentenceEquality(s.content, oppositeContent) && findAbove(goalSentence.id, s.id, state.proofs))

                        let oppositeId

                        if (foundOpposite) {
                            oppositeId = foundOpposite.id
                        } else {
                            oppositeId = newSentence(oppositeContent, goalSentence.id, parentId, dispatch)
                            dispatch({type: "SET GOAL", newId: oppositeId})
                        }

                        newJustification(goalSentence.id, "¬e", [chosenSentence.id, oppositeId], dispatch)

                        if (foundOpposite){
                            setNextGoal(goalSentence.id)
                        }

                        break
                    case "existential":

                        let constant

                        if (options.constant) {
                            constant = options.constant
                        } else {
                            constant = alphabet.find( l => !state.globalConstants.includes(l))
                            dispatch({type: "ADD CONSTANT", newConstant: constant})
                        }

                        const instantiation = substitute(constant, goalSentence.content.variable, goalSentence.content.right)

                        const found = state.sentences.find( s => sentenceEquality(s.content, instantiation) && findAbove(goalSentence.id, s.id, state.proofs))

                        if (found) {
                            newJustification(goalSentence.id, "∃i", [found.id], dispatch)
                            setNextGoal(goalSentence.id)
                        } else {
                            const lineId = newSentence(instantiation, goalSentence.id, parentId, dispatch)
                            newJustification(goalSentence.id, "∃i", [lineId], dispatch)
                            dispatch({type: "SET GOAL", newId: lineId})
                        }
                        break
                    case "universal":

                        const newConstant = alphabet.find( l => !state.globalConstants.includes(l))
                        const inst = substitute(newConstant, goalSentence.content.variable, goalSentence.content.right)
                        const lineId = newSentence(inst, goalSentence.id, parentId, dispatch)
                        newJustification(goalSentence.id, "∀i", [lineId], dispatch)
                        dispatch({type: "ADD CONSTANT", newConstant: newConstant})
                        dispatch({type: "SET GOAL", newId: lineId})
                        break
                }
        }

    } else {
        // Elim Rules
        switch(focusSentence.content.type) {
            case "conjunction":
                const derived = focusSentence.content[options.side]
                if (sentenceEquality(derived, goalSentence.content)) {
                    newJustification(goalSentence.id, "&e", [focusSentence.id], dispatch)
                    setNextGoal(goalSentence.id)
                } else {
                    const conId = newSentence(derived, goalSentence.id, parentId, dispatch)
                    newJustification(conId, "&e", [focusSentence.id], dispatch)
                }
                break
            case "conditional":

                const antecedent = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content.left) && findAbove(goalSentence.id, s.id, state.proofs))

                const consequent = focusSentence.content.right

                let minorId
                
                if (antecedent) {
                    minorId = antecedent.id
                } else {
                    minorId = newSentence(focusSentence.content.left, goalSentence.id, parentId, dispatch)
                    dispatch({type: "SET GOAL", newId: minorId})
                }

                if (sentenceEquality(consequent, goalSentence.content)) {
                    newJustification(goalSentence.id, "→e", [minorId, focusSentence.id], dispatch)
                    if (antecedent) {
                        setNextGoal(goalSentence.id)
                    }
                } else {
                    const conId = newSentence(consequent, goalSentence.id, parentId, dispatch)
                    newJustification(conId, "→e", [minorId, focusSentence.id], dispatch)
                }
                break
            case "disjunction":
                const left = focusSentence.content.left
                const right = focusSentence.content.right

                const leftIds = newProof(left, goalSentence.content, goalSentence.id, parentId, dispatch)
                const rightIds = newProof(right, goalSentence.content, goalSentence.id, parentId, dispatch)

                newJustification(goalSentence.id, "∨e", [focusSentence.id, leftIds.main, rightIds.main], dispatch)

                dispatch({type: "SET GOAL", newId: leftIds.sub})
                break

            case "negation":
                
                const unnegated = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content.right) && findAbove(goalSentence.id, s.id, state.proofs))

                let unnegatedId
                
                if (unnegated) {
                    unnegatedId = unnegated.id
                } else {
                    unnegatedId = newSentence(focusSentence.content.right, goalSentence.id, parentId, dispatch)
                    dispatch({type: "SET GOAL", newId: unnegatedId})
                }

                if (sentenceEquality({type: "contradiction"}, goalSentence.content)) {
                    newJustification(goalSentence.id, "¬e", [unnegatedId, focusSentence.id], dispatch)
                    if (unnegated){
                        setNextGoal(goalSentence.id)
                    }
                } else {
                    const conId = newSentence({type: "contradiction"}, goalSentence.id, parentId, dispatch)
                    newJustification(conId, "¬e", [unnegatedId, focusSentence.id], dispatch)
                }
                break
                
            case "contradiction":
                newJustification(goalSentence.id, "Explosion", [focusSentence.id], dispatch)
                setNextGoal(goalSentence.id)
                break

            case "universal":

                let constant

                if (options.constant) {
                    constant = options.constant
                } else {
                    constant = alphabet.find( l => !state.globalConstants.includes(l))
                    dispatch({type: "ADD CONSTANT", newConstant: constant})
                }

                const instantiation = substitute(constant, focusSentence.content.variable, focusSentence.content.right)

                if (sentenceEquality(instantiation, goalSentence.content)) {
                    newJustification(goalSentence.id, "∀e", [focusSentence.id], dispatch)
                    setNextGoal(goalSentence.id)
                } else {
                    const lineId = newSentence(instantiation, goalSentence.id, parentId, dispatch)
                    newJustification(lineId, "∀e", [focusSentence.id], dispatch)
                }

                break
            case "existential":
                const newConstant = alphabet.find( l => !state.globalConstants.includes(l))
                const inst = substitute(newConstant, focusSentence.content.variable, focusSentence.content.right)

                const subProofIds = newProof(inst, goalSentence.content, goalSentence.id, parentId, dispatch)
                
                newJustification(goalSentence.id, "∃e", [focusSentence.id, subProofIds.main], dispatch)

                dispatch({type: "ADD CONSTANT", newConstant: newConstant})
                dispatch({type: "SET GOAL", newId: subProofIds.sub})

                break
        }
    }

    dispatch({type: "UNSET FOCUS"})
    

}






export default fill 