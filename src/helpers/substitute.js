
const substitute = (constant, variable, sentence) => {

    if (sentence.type === "atom") {
        const converted = sentence.terms.map( t => t === variable ? constant : t)
        return {type: "atom", predicate: sentence.predicate, terms: converted}
    } else if (sentence.type === "contradiction") {
        return sentence
    } else if (sentence.type === "negation") {
        return {type: "negation", right: substitute(constant, variable, sentence.right)}
    } else if (sentence.type === "universal" || sentence.type === "existential") {
        return {type: sentence.type, variable: sentence.variable, right: substitute(constant, variable, sentence.right)}
    } else {
        return {type: sentence.type, left: substitute(constant, variable, sentence.left), right: substitute(constant, variable, sentence.right)}
    }
}

export default substitute