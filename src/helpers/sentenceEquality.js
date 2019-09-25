
import substitute from './substitute'

const sentenceEquality = (x, y) => {
    if (x.type === "atom" && y.type === "atom") {
        if (x.letter && y.letter) {
            return x.letter === y.letter
        } else if (x.predicate && y.predicate) {
            return x.predicate === y.predicate && x.terms.length === y.terms.length && y.terms.every((t, idx) => t === y.terms[idx])
        } else {
            return false
        }
    } else if (x.type === "contradiction" && y.type === "contradiction") {
        return true
    } else if (x.type === "negation" && y.type === "negation") {
        return sentenceEquality(x.right, y.right)
    } else if ((x.type === "universal" && y.type === "universal")||(x.type === "existential" && y.type === "existential")) {
        return sentenceEquality( x.right, substitute(x.variable, y.variable, y.right))
    } else if (x.type === y.type) {
        return sentenceEquality(x.left, y.left) && sentenceEquality(x.right, y.right)
    } else {
        return false
    }
} 

export default sentenceEquality