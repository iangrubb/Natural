


import sentenceEquality from '../helpers/sentenceEquality'


const fill = (state, goalSentence, focusSentence, options, dispatch) => {

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



    // Proof Rule Cases
    const parentId = state.proofs.find( p => p.children.includes(goalSentence.id)).id

    // Intro Rules
    if (goalSentence.id === focusSentence.id) {
        switch(focusSentence.content.type) {
            case "conjunction":
                const leftId = newSentence(focusSentence.content.left, goalSentence.id, parentId, dispatch)
                const rightId = newSentence(focusSentence.content.right, goalSentence.id, parentId, dispatch)
                newJustification(goalSentence.id, "&i", [leftId, rightId], dispatch)
                dispatch({type: "SET GOAL", newId: leftId})
                break
            case "disjunction":
                const disId = newSentence(focusSentence.content[options.side], goalSentence.id, parentId, dispatch)
                newJustification(goalSentence.id, "∨i", [disId], dispatch)
                dispatch({type: "SET GOAL", newId: disId})
                break
            case "conditional":
                const goalIds = newProof(focusSentence.content.left, focusSentence.content.right, goalSentence.id, parentId, dispatch)
                newJustification(goalSentence.id, "→i", [goalIds.main], dispatch)
                dispatch({type: "SET GOAL", newId: goalIds.sub})
                break
        }

    // Elim Rules
    } else {
        switch(focusSentence.content.type) {
            case "conjunction":
                const derived = focusSentence.content[options.side]
                if (sentenceEquality(derived, goalSentence.content)) {
                    newJustification(goalSentence.id, "&e", [focusSentence.id], dispatch)
                    dispatch({type: "UNSET GOAL"})
                } else {
                    const conId = newSentence(derived, goalSentence.id, parentId, dispatch)
                    newJustification(conId, "&e", [focusSentence.id], dispatch)
                }
                break
            case "conditional":
                const consequent = focusSentence.content.right
                let minorId
                
                if (options.antecedent) {
                    minorId = options.antecedent.id
                } else {
                    minorId = newSentence(focusSentence.content.left, goalSentence.id, parentId, dispatch)
                    dispatch({type: "SET GOAL", newId: minorId})
                }

                if (sentenceEquality(consequent, goalSentence.content)) {
                    newJustification(goalSentence.id, "→e", [minorId, focusSentence.id], dispatch)
                    dispatch({type: "UNSET GOAL"})
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

        }
    }



    dispatch({type: "UNSET FOCUS"})
}






export default fill 