
// Use to check whether a sentence with a given Id is accesible for a goal with a given Id
const findAbove = (goalId, sentenceId, proofs) => {
    
    const starter = proofs.find( p => p.children.includes(goalId))

    const checkAbove = (currentProof, currentLocationId) => {

        if (currentProof.children.slice(0, currentProof.children.indexOf(currentLocationId)).includes(sentenceId)) {
            return true
        } else if (!proofs.find(p => p.children.includes(currentProof.id))) {
            return false
        } else {
            return checkAbove(proofs.find(p => p.children.includes(currentProof.id)), currentProof.id)
        }
    }
    return checkAbove(starter, goalId)
}

export default findAbove 