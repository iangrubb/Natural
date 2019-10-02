
const loadProof = (premises, conclusion, type, history, dispatch, id)=>{

    const modifiedPremises = premises.map( (p, idx) => { return {id: (idx + 1) * 2 , content: p, justificationId: idx + 1} })
    const modifiedConclusion = {id: (premises.length + 1) * 2, content: conclusion}

    const sentences = [...modifiedPremises, modifiedConclusion]

    const extractConstants = sentence => {
        if (sentence.type === "atom" && sentence.predicate) {
            return sentence.terms.filter( t => typeof t === "string")
        } else if (sentence.type === "atom" && sentence.letter) {
            return []
        } else if (sentence.type === "contradiction") {
            return []
        } else if (sentence.type === "universal" || sentence.type === "existential" || sentence.type === "negation") {
            return extractConstants(sentence.right)
        } else {
            return [...extractConstants(sentence.left), ...extractConstants(sentence.right)]
        }
    }

    dispatch({type: "LOAD PROOF TYPE", proofType: type})
    dispatch({type: "LOAD PROOFS", children: sentences.map((s, idx) => (idx + 1) * 2)})
    dispatch({type: "LOAD SENTENCES", sentences: sentences})
    dispatch({type: "LOAD JUSTIFICATIONS", premises: premises })
    dispatch({type: "SET GOAL", newId: modifiedConclusion.id})
    dispatch({type: "UNSET FOCUS"})
    dispatch({type: "LOAD PROOF COUNTER"})
    dispatch({type: "LOAD SENTENCE COUNTER", counter: sentences.length * 2 })
    dispatch({type: "LOAD JUSTIFICATION COUNTER", counter: premises.length })
    dispatch({type: "LOAD GLOBAL CONSTANTS", constants: sentences.flatMap( s => extractConstants(s.content) ) })


    // Reset state storage.
    dispatch({type: "DISCARD STAGES", finalStage: 0})
    dispatch({type: "SET STAGE", stage: 0})
    dispatch({type: "SET MAX STAGE", maxStage: 0})

    if (id) {
        dispatch({type: "SET PROOF ID", id: id})
    }

    history.push('./proof')

}

export default loadProof